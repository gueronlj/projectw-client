import LoginButton from './Login/LoginButton';
import LogoutButton from "./Logout/LogoutButton";
import style from './style.module.css';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className={style.header}>
            <h1>$</h1>
            {isAuthenticated && <h4>{user.name}</h4>}
            {isAuthenticated ? <LogoutButton/> : <LoginButton/>}      
        </div>
    )
}

export default Header;