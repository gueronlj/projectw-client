import { Link } from 'react-router-dom'
import Linker from '../Linker';
import style from './style.module.css';

const SideMenu = ( {linkToken} ) => {
    return (
        <div className={style.sideMenu}>   
            <ul>
                <li><Link to="/">Accounts</Link></li>
                <li><Link to="/transactions" >Transactions</Link></li>
                <li><Link to="/liabilities">Liabilities</Link></li>
                <li><Link to="/recurring">Recurring</Link></li>
                <li><Link to="/item">Item</Link></li>
            </ul>
            <Linker
                linkToken={linkToken}/>
        </div>
    );
};

export default SideMenu;