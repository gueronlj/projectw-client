import { useState } from 'react';
import AccountsTable from '../AccountsTable/AccountsTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import LiabilitiesTable from '../LiabilitiesTable/LiabilitiesTable';
import Recuring from '../Recurring/recurring';
import Items from '../Items/items';
import { Route, Routes } from "react-router-dom";
import style from './style.module.css';
import Header from '../Header/header';
import SideMenu from '../SideMenu/SideMenu';

const PlaidLink = ({linkToken}) => {
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState({id: "007"});

    return (
        <div>
            <Header/>
            
            <div className={style.main}>
                
                <SideMenu
                    linkToken={linkToken}/>

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