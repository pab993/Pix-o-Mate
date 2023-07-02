import { Fragment, useEffect, useState } from "react";
import { instance } from "../../utils/axios-config";
import loadingIcon from '../../assets/loading.gif';
import './styles.scss';
import DetailsComponent from "../../components/details/Details";
import { generateCreationDateFormatted, generateCreationDateHashing, generatePhoneHashing } from "../../utils/commons";
import Search from "./Search";

const OwnerList = ({text}) => {

    const PER_PAGE = 10;
    const [search, setSearch] = useState("");
    const [owners, setOwners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        loadOwnersData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if(!toggle){
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                
                if (windowHeight + scrollTop >= documentHeight) {
                    addMore();
                    console.log('Fin de la ventana alcanzado');
                }
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, [toggle, currentPage]);

    const handleChangeToggle = () => {
        setToggle(!toggle);
    }

    const loadOwnersData = async (startPage = 1, optionalSearch = null) => {
        let buildUrl = `/users?page=${startPage}&per_page=${PER_PAGE}` + (text ? `&name=${optionalSearch ? optionalSearch : search}` : "");
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
        let buildUrl = `/users?page=${currentPage + 1}&per_page=${PER_PAGE}` + (text ? `&name=${search}` : "");
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
            if(!o.hasOwnProperty("selected")){
                const currentDate = new Date();
                o.created_at = generateCreationDateHashing(new Date(2012, 0, 1), currentDate, o.id);
                const ddmmyyyAndhhmm = o.created_at.split(" ");
                const ddmmyyyy = ddmmyyyAndhhmm[0].split("/");
                const hhmm = ddmmyyyAndhhmm[1].split(":");
                const hh = hhmm[0];
                o.created_at_formatted = generateCreationDateFormatted(new Date(ddmmyyyy[2], ddmmyyyy[1] - 1, ddmmyyyy[0], hh), currentDate);
                o.phone = generatePhoneHashing(o.id);
                o.selected = false;
            }
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
        <>
            {loading ?
                <figure className="loading">
                    <img src={loadingIcon} alt="Cargando..."/>
                </figure>
                :
                <div className="owners">
                    <button className="btn toggle" onClick={handleChangeToggle}>Alternar entre botón de cargar e "infinite scroll"</button>
                    {text && <Search handleSubmit={loadOwnersData} search={search} setSearch={setSearch} setCurrentPage={setCurrentPage}/>}
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
                                    
                                    {toggle &&
                                        <>
                                            {currentPage !== totalPages &&
                                                <>
                                                    {loadingBtn ?
                                                        <button className="btn" disabled>Cargando...</button>
                                                    :    
                                                        <button className="btn" onClick={addMore}>Ver más</button>
                                                    }
                                                    
                                                </>
                                            }
                                        </>
                                    }
                                    
                                </div>
                                <DetailsComponent owners={owners} setOwners={setOwners}/>
                            </>
                        }
                    </div>
                </div>
            }
        </>
     );
}
 
export default OwnerList;