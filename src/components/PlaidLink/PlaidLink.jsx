import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import AccountsTable from '../AccountsTable/AccountsTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import LiabilitiesTable from '../LiabilitiesTable/LiabilitiesTable';
import Recuring from '../Recurring/recurring';
import Items from '../Items/items';
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom'
import style from './style.module.css';
import Header from '../Header/header';

const PlaidLink = ({ linkToken }) => {
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState({id: "007"});

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
            setAuthorized(true);
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
        <div>
            <Header linkToken={linkToken}/>
            <div className={style.main}>
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

                <div className={style.content}>
                    {error && 
                    <p>{error}</p>}

                    <Routes>
                        <Route path="/" element={<AccountsTable currentUser={currentUser}/>}/>
                        <Route path="/transactions" element={<TransactionsTable currentUser={currentUser}/>}/>
                        <Route path="/liabilities" element={<LiabilitiesTable currentUser={currentUser}/>}/>
                        <Route path="/recurring" element={<Recuring currentUser={currentUser}/>}/>
                        <Route path="/item" element={<Items currentUser={currentUser}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default PlaidLink;