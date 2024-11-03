import { useEffect, useState } from 'react';
import { instance } from '../../utils/axios-config';
import './styles.scss';
import { useInterceptor } from '../../context/Interceptor';
import loadingIcon from '../../assets/loading.gif';

const Details = ({owners, setOwners}) => {

    const {favs, updateFavs} = useInterceptor();
    const [currentOwner, setCurrentOwner] = useState(owners.find((o)=> {return o.selected}));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let selected = owners.find((o)=> {return o.selected});
        if(selected && currentOwner?.id !== selected.id){
            refreshDetails(selected);
        }else if(!selected && currentOwner){
            setCurrentOwner();
        }
    }, [owners]);

    const refreshDetails = async(selected) => {
        let buildUrl = `/users/${selected.id}`;
        try{
            setLoading(true);
            setError(false);
            instance.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_GOREST_API_KEY}`}
            await instance.get(buildUrl).then(function(resp) {
                resp.data.phone = selected.phone;
                resp.data.created_at = selected.created_at;
                resp.data.created_at_formatted = selected.created_at_formatted;
                resp.data.selected = true;
                setCurrentOwner(resp.data);
                let updatedOwnersList = owners.map((o) => {
                    if(o.id === resp.data.id){
                        return resp.data;
                    }
                    return o;
                });
                setOwners(updatedOwnersList);
                setLoading(false);
            }).catch(function(err) {
                setLoading(false);
                setError(true);
            });
        }catch(error){
            setLoading(false);
            setError(true);
        }
    }

    const addRemoveFav = (current) => {
        if(!favs.some(item => current.id === item.id)){
            delete current.selected;
            updateFavs([...favs, current]);
        }else{
            updateFavs(favs.filter((item) => { return current.id !== item.id}));
        }
    }

    return (
        <>
            {currentOwner &&
                <div className="details">
                    <div className="details-container">
                        {!loading ?
                            <>
                                {error ?
                                    <p>Algo ha fallado al intentar el detalle del dueño, inténtelo más tarde...</p>
                                    :
                                    <>
                                        <h2 className="noMargin">Detalles:</h2>
                                        <p>{currentOwner.name}</p>
                                        <p>{currentOwner.email}</p>
                                        <p>{currentOwner.gender}</p>
                                        <p>{currentOwner.status}</p>
                                        <p>Teléfono: {currentOwner.phone}</p>
                                        <p>Fecha de registro: {currentOwner.created_at}</p>
                                        <p>{currentOwner.created_at_formatted}</p>
                                        <button className="btn" onClick={() => addRemoveFav(currentOwner)}>{favs.some(item => currentOwner.id === item.id) ? "Quitar de favoritos" : "Añadir a favoritos"}</button>
                                    </>
                                }
                            </>
                            :
                            <figure className="loading">
                                <img src={loadingIcon} alt="Cargando..."/>
                            </figure>
                        }
                    </div>
                </div>
            }
        </>
     );
}
 
export default Details;