import { Fragment, useEffect, useState } from "react";
import { instance } from "../../utils/axios-config";
import loadingIcon from '../../assets/loading.gif';
import './styles.scss';
import DetailsComponent from "../../components/details/Details";
import { generateCreationDate, generatePhone } from "../../utils/commons";

const OwnersPage = () => {

    const PER_PAGE = 10;

    const [owners, setOwners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadOwnersData();
    }, []);

    const loadOwnersData = async (startPage = 1) => {
        let buildUrl = `/users?page=${startPage}&per_page=${PER_PAGE}`;
        try{
            instance.defaults.headers.common = {'Authorization': `Bearer ${process.env.REACT_APP_GOREST_API_KEY}`}
        
            await instance.get(buildUrl).then(function(resp) {
                let ownersList = addData(resp.data);
                setOwners(ownersList);
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
                let newList = addData(resp.data);
                let ownersList = addData([...owners, ...newList]);
                setOwners(ownersList);
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

    const addData = (ownersList) => {
        let addedFields = ownersList.map((o) => {
            o.phone = generatePhone();
            o.created_at = generateCreationDate(new Date(2012, 0, 1), new Date());
            o.selected = false;
            return o;
        });
        return addedFields;
    }

    const handlerSelected = (owner) => {
        let ownersList = [];
        if(owner.selected){
            ownersList = owners.map((o) => {
                if(o.id === owner.id){
                    o.selected = false;
                    return o;
                }else{
                    return o;
                }
            });
        }else{
            ownersList = owners.map((o) => {
                if(o.id === owner.id){
                    o.selected = true;
                    return o;
                }else{
                    o.selected = false;
                    return o;
                }
            });
        }
        setOwners(ownersList);
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
                                                {owners.map((owner) => {
                                                    return (
                                                        <Fragment key={"owner-row-" + owner.id}>
                                                            <li className={"owners-item" + (owner.selected ? " selected" : "")} onClick={() => handlerSelected(owner)}>
                                                                {owner.name}, {owner.email}, {owner.gender}, {owner.status}
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
                            <DetailsComponent owners={owners} setOwners={setOwners}/>
                        </>
                    }
                </div>
            }
        </div>
     );
}
 
export default OwnersPage;