import { useStatus } from "../../context/Status";
import { CONFIG } from "../../utils/pages-config";
import './styles.scss';

const Header = (props) => {

    const {favs} = useStatus();
    const bPages = CONFIG.pages.find((f) => f.slug === props?.page);

    return ( 
        <header className="header">
            <div className="header-icon cat">0</div>
            <div className="header-breadcrumbs">
                <h1 className="noMargin">{bPages && bPages.breadcrumbs.title}</h1>
            </div>
            <div className="header-icon heart">{favs}</div>
        </header>
     );
}
 
export default Header;