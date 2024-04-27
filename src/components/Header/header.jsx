import LoginButton from './Login/LoginButton';
import LogoutButton from "./Logout/LogoutButton";
import style from './style.module.css';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className={style.header}>
            <h1>$$$</h1>
            {isLoading? <h3>Checking session...</h3> : 
            <>
                {isAuthenticated && <h2>Welcome, {user.name}</h2>}
                {isAuthenticated ? <LogoutButton/> : <LoginButton/>}  
            </>}      
        </div>
    );
}

export default Header;