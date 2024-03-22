import { usePlaidLink } from 'react-plaid-link';
import { Link } from 'react-router-dom'
import style from './style.module.css';
import { useCallback, useState } from 'react';

const SideMenu = ( {linkToken} ) => {
    const [error, setError] = useState(null);

    const onSuccess = useCallback((public_token) => {
        const exchangePublicToken = async () => {
            try {
                await fetch('http://localhost:3000/api/exchange_public_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    public_token: public_token,
                    user_id: currentUser.id 
                }),
            });
            } catch (error) {
                setError(error);
            }           
        }
        exchangePublicToken();
    },[]);

    const config = {
        token: linkToken,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);

    return (
        <div className={style.sideMenu}>   
            <ul>
                <li><Link to="/">Accounts</Link><br/></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/liabilities">Liabilities</Link></li>
                <li><Link to="/recurring">Recurring</Link></li>
                <li><Link to="/item">Item</Link></li>
            </ul>
            <button onClick={() => open()} disabled={!ready}>
                Add Bank
            </button>
        </div>
    );
};

export default SideMenu;