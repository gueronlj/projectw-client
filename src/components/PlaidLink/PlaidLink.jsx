import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import AccountsTable from '../AccountsTable/AccountsTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import LiabilitiesTable from '../LiabilitiesTable/LiabilitiesTable';
import Recuring from '../Recurring/recurring';
import Items from '../Items/items';
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom'

const PlaidLink = ({ linkToken }) => {
    const [authorized, setAuthorized] = useState(true);
    const [loading, setLoading] = useState(false);
   
    const [transactionData, setTransactionData] = useState(null)
    const [liabilities, setLiabilities] = useState(null)
    const [recurring, setRecurring] = useState(null)
    const [item, setItem] = useState(null)
    const [loadingLiabilities, setLoadingLiabilities] = useState(false)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({id: "007"});

    const onSuccess = useCallback((public_token) => {
        // send public_token to server
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
        console.log('linked');
    }, []);


    //TODO: Must be called twice to get the transactions. WHY?
    const getTransactions = async () => {
        const data = await getData('transactions');
        setTransactionData(data.added);
        console.log(data.added);    
    }
    const getLiabilities = async () => {
        const data = await getData('liabilities');
        setLiabilities(data.liabilities);        
    }

    const getInvestments = async () => {
        const data = await getData('investments');
        console.log(data);
    }

    const getItems = async () => {
        const data = await getData('item');
        console.log(data);
        setItem(data.item);
    }

    const getRecuringTransactions = async () => {
        const data = await getData('transactions/recurring');
        console.log(data.incoming);
        setRecurring(data); 
    }

    const config = {
        token: linkToken,
        onSuccess
    }
    
    const { open, ready } = usePlaidLink(config);

    return (<>
        {error && 
            <p>{error}</p>}

        <button onClick={() => open()} disabled={!ready}>
            Add bank account
        </button>
        
        <div>
            <Link to="/">Accounts</Link><br/>
            <Link to="/transactions">Transactions</Link><br/>
            <Link to="/liabilities">Liabilities</Link><br/>
            <Link to="/recurring">Recurring</Link><br/>
            <Link to="/item">Item</Link><br/>
        </div>
       

        <Routes>
            <Route path="/" element={<AccountsTable currentUser={currentUser}/>}/>
            <Route path="/transactions" element={<TransactionsTable currentUser={currentUser}/>}/>
            <Route path="/liabilities" element={<LiabilitiesTable currentUser={currentUser}/>}/>
            <Route path="/recurring" element={<Recuring currentUser={currentUser}/>}/>
            <Route path="/item" element={<Items currentUser={currentUser}/>}/>
        </Routes>
    </>);
}

export default PlaidLink;