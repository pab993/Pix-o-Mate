import { Fragment, useEffect, useState } from "react";
import { instance } from "../../utils/axios-config";
import loadingIcon from '../../assets/loading.gif';
import './styles.scss';
import DetailsComponent from "../../components/details/Details";

const OwnersPage = () => {

    const PER_PAGE = 10;

    const [owners, setOwners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        loadOwnersData();
    }, []);

    const loadOwnersData = async (startPage = 1) => {
        let buildUrl = `/users?page=${startPage}&per_page=${PER_PAGE}`;
        try{
            instance.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_GOREST_API_KEY}`}
        
            await instance.get(buildUrl).then(function(resp) {
                setOwners(resp.data);
                setTotalPages(resp.headers.get('X-Pagination-Pages'));
            }).catch(function(err) {
                setError(true);
            }).finally(()=>{
                setLoading(false);
            });
        }catch(error){
            setError(true);
        }
    }

    const addMore = async() => {
        let buildUrl = `/users?page=${currentPage + 1}&per_page=${PER_PAGE}`;
        try{
            instance.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_GOREST_API_KEY}`}
            setLoadingBtn(true);
            await instance.get(buildUrl).then(function(resp) {
                setOwners([...owners, ...resp.data]);
            }).catch(function(err) {
                setError(true);
            }).finally(()=>{
                setCurrentPage(currentPage + 1);
                setLoadingBtn(false);
            });
        }catch(error){
            setError(true);
            setLoadingBtn(false);
        }
    }

    const handlerSelected = (id) => {
        if(!selected || (id !== selected)){
            setSelected(id);
        }else if(id === selected){
            setSelected();
        }
    }

    return ( 
        <div className="owners">
            {loading ?
                <figure className="loading">
                    <img src={loadingIcon} alt="Cargando..."/>
                </figure>
                :
                <div className="owners-container">
                    {error ? 
                        <p>Algo ha fallado al intentar recuperar los dueños, inténtelo más tarde...</p>
                    :
                        <>
                            <div className="owners-container-box">
                                <ul className="owners-list">
                                    {owners.length > 0 ? (
                                            <>
                                                {owners.map((owner, index) => {
                                                    return (
                                                        <Fragment key={"owner-row-" + owner.id}>
                                                            <li className={"owners-item" + (owner.id === selected ? " selected" : "")} onClick={() => handlerSelected(owner.id)}>
                                                                {owner.name}, {owner.status}
                                                            </li>
                                                        </Fragment>
                                                    )
                                                })}
                                            </>
                                        )
                                        :
                                        (
                                            <p>No se han encontrado dueños...</p>
                                        )
                                    }
                                </ul>
                                {currentPage !== totalPages &&
                                    <>
                                        {loadingBtn ?
                                            <button className="btn" disabled>Cargando...</button>
                                        :    
                                            <button className="btn" onClick={addMore}>Ver más</button>
                                        }
                                        
                                    </>
                                }
                            </div>
                            <DetailsComponent id={selected}/>
                        </>
                    }
                </div>
            }
        </div>
     );
}
 
export default OwnersPage;