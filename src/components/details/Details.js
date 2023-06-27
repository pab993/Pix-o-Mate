import { useEffect, useState } from 'react';
import { instance } from '../../utils/axios-config';
import './styles.scss';
import { useStatus } from '../../context/Status';

const Details = ({owners, setOwners}) => {

    const {favs, updateFavs} = useStatus();
    const [currentOwner, setCurrentOwner] = useState(owners.find((o)=> {return o.selected}));

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
            instance.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_GOREST_API_KEY}`}
            await instance.get(buildUrl).then(function(resp) {
                resp.data.phone = selected.phone;
                resp.data.created_at = selected.created_at;
                resp.data.selected = true;
                setCurrentOwner(resp.data);
                let updatedOwnersList = owners.map((o) => {
                    if(o.id === resp.data.id){
                        return resp.data;
                    }
                    return o;
                });
                setOwners(updatedOwnersList);
            }).catch(function(err) {
            });
        }catch(error){
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
                    <h2 className="noMargin">Detalles:</h2>
                    <p>{currentOwner.name}</p>
                    <p>{currentOwner.email}</p>
                    <p>{currentOwner.gender}</p>
                    <p>{currentOwner.status}</p>
                    <p>{currentOwner.phone}</p>
                    <p>{currentOwner.created_at}</p>
                    <button className="btn" onClick={() => addRemoveFav(currentOwner)}>{favs.some(item => currentOwner.id === item.id) ? "Quitar de favoritos" : "Añadir a favoritos"}</button>
                </div>
                </div>
            }
        </>
     );
}
 
export default Details;