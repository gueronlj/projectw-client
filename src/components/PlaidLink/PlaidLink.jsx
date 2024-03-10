/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import AccountsTable from '../AccountsTable/AccountsTable';
import TransactionsTable from '../TransactionsTable/TransactionsTable';

const PlaidLink = ({ linkToken }) => {
    const [authorized, setAuthorized] = useState(true);
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState(null)
    const [transactionData, setTransactionData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSuccess = useCallback((public_token) => {
        // send public_token to server
        const exchangePublicToken = async () => {
            try {
                await fetch('http://localhost:3000/api/exchange_public_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token: public_token }),
            });
            setAuthorized(true);
            } catch (error) {
                setError(error);
            }           
        }
        exchangePublicToken();
    }, []);

    const handleGetAccounts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/accounts',{
                method: 'GET',
        });
            const data = await response.json();
            setAccounts(data.accounts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getTransactions = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/transactions', {
                method: 'GET',            
            });
            const data = await response.json();
            if (data.error != null ) {
                setError(data.error);
                setIsLoading(false);
                return;
            }
            setTransactionData(data);
            setIsLoading(false);
            setError(null);                      
        } catch (error) {
            setError(error);
        }
    }

    const config = {
        token: linkToken,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);

    return (<>
        {error != null && 
            <p>Error: {error}</p>}

        {authorized ? 
            <button onClick={handleGetAccounts}>Accounts</button>
            : 
            <button onClick={() => open()} disabled={!ready}>
                Add bank account
            </button>}

        {loading && !accounts && 
            <p>Loading...</p>}
        
        <button onClick={getTransactions}>
            {isLoading ? "Loading..." : `Show transactions`}
        </button>

        {accounts != null &&           
            <AccountsTable data={accounts}/>}

        {transactionData != null &&
            <TransactionsTable data={transactionData}/>}        
    </>);
}

export default PlaidLink;