import { Fragment } from 'react';
import { useStatus } from '../../context/Status';
import './styles.scss';

const FavModal = ({open, setOpen}) => {

    const {favs, setFavs} = useStatus();

    const handleClose = (e) => {
        setOpen(false);
    }

    return (
        <>
            {open &&
                <div className="modal-favs" onClick={(e)=>{handleClose(e)}}>
                    <div className="modal-favs-container" onClick={(e)=>{e.stopPropagation()}}>
                        <button className="modal-favs-close" onClick={(e)=>{handleClose(e)}}></button>
                        <h2 className="modal-favs-title">FAVORITOS</h2>
                        <ul className="modal-favs-list">
                        {favs.length > 0 ? (
                                <>
                                    {favs.map((fav) => {
                                        return (
                                            <Fragment key={"modal-favs-row-" + fav.id}>
                                                <li className="modal-favs-item">
                                                    {fav.name}, {fav.email}, {fav.gender}, {fav.status}
                                                </li>
                                            </Fragment>
                                        )
                                    })}
                                    <button className="btn" onClick={()=> setFavs([])}>Eliminar todos de favoritos</button>
                                </>
                            )
                            :
                            (
                                <p>No se han encontrado dueños en favoritos...</p>
                            )
                        }

                        </ul>
                    </div>
                </div>
            }
        </>
     );
}
 
export default FavModal;