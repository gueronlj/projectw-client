import style from './style.module.css';

const Header = ({linkToken}) => {
    return (
        <div className={style.header}>
        <h1>$$$</h1>
            <button>Logout</button>
        </div>
    );
}

export default Header;