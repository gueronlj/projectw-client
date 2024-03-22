import LoginButton from './Login/LoginButton';
import LogoutButton from "./Logout/LogoutButton";
import style from './style.module.css';
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({linkToken}) => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className={style.header}>
            <h1>$$$</h1>
            <h3>{isAuthenticated ? 
                `Hello, ${user.name}` : 'Please log in'}
            </h3>
            <LoginButton/>
            <LogoutButton/>
        </div>
    );
}

export default Header;