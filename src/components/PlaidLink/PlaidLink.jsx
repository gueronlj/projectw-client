/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import AccountsTable from '../AccountsTable/AccountsTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';
import LiabilitiesTable from '../LiabilitiesTable/LiabilitiesTable';

const PlaidLink = ({ linkToken }) => {
    const [authorized, setAuthorized] = useState(true);
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState(null)
    const [transactionData, setTransactionData] = useState(null)
    const [liabilities, setLiabilities] = useState(null)
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
    }, []);

    const getData = async (endpoint) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: currentUser.id }),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
                return;
            }   
            setError(null);
            return data;
        }catch(error){
            setError(error);
        }
    }

    const handleGetAccounts = async () => {
        const data = await getData('accounts');
        setAccounts(data.accounts);
    }
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

    const getItem = async () => {
        const data = await getData('item');
        console.log(data);
    }

    const getRecuringTransactions = async () => {
        const data = await getData('transactions/recurring');
        console.log(data);
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

        {authorized && 
            <button onClick={handleGetAccounts}>Accounts</button>}

        <button onClick={getLiabilities}>
            {loadingLiabilities ? "Loading..." : `Liabilities`}
        </button>

        <button onClick={getTransactions}>
            {isLoading ? "Loading..." : `Transactions`}
        </button>

        <button onClick={getInvestments}>
            {isLoading ? "Loading..." : `Investments`}
        </button>

        <button onClick={getItem}>
            {isLoading ? "Loading..." : `Item`}
        </button>

        <button onClick={getRecuringTransactions}>
            {isLoading ? "Loading..." : `Recuring`}
        </button>

        {loading && !accounts && 
            <h2>Loading...</h2>}

        {accounts != null &&           
            <AccountsTable data={accounts}/>}

        {transactionData != null &&
            <TransactionsTable data={transactionData}/>}
        
        {liabilities != null &&
            <LiabilitiesTable data={liabilities}/>}
    </>);
}

export default PlaidLink;