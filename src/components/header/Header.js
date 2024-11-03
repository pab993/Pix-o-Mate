import { useState } from "react";
import { useInterceptor } from "../../context/Interceptor";
import { CONFIG } from "../../utils/pages-config";
import FavModal from "../modals/FavModal";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import backIcon from '../../assets/back-arrow.png';

const Header = (props) => {

    const {favs} = useInterceptor();
    const {apiCalls} = useInterceptor();
    const [open, setOpen] = useState(false);
    const bPages = CONFIG.pages.find((f) => f.slug === props?.page);

    const navigate = useNavigate();

    const renderBreabcrumb = (item) =>
        item.to ? (
            <>
                <img src={backIcon} alt="Retroceder"
                    onClick={() => {
                        navigate(item.to);
                    }
                }/>
                
                <h1 className="noMargin">
                    {item.title}
                </h1>
            </>
        ) : (
            <h1 className="noMargin">
                {item.title}
            </h1>
    );

    return ( 
        <>
            <header className="header">
                <div className="header-icon cat">{apiCalls}</div>
                <div className="header-breadcrumbs">
                    {bPages && renderBreabcrumb(bPages.breadcrumbs)}
                </div>
                <div className="header-icon heart" onClick={() => setOpen(true)}>{favs.length}</div>
            </header>
            <FavModal open={open} setOpen={setOpen}/>
        </>
     );
}
 
export default Header;