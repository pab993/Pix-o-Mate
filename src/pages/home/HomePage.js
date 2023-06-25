import { Link } from 'react-router-dom';
import './styles.scss';

const HomePage = () => {
    return ( 
        <div className="home">
            <Link className="home-box ownerz" to="/owners"><p>Dueños</p></Link>
            <Link className="home-box search" to="/search"><p>Buscar</p></Link>
        </div>
     );
}
 
export default HomePage;