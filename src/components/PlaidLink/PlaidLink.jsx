/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import AccountsTable from '../AccountsTable/AccountsTable';

const PlaidLink = ({ linkToken }) => {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState(null)
    const onSuccess = useCallback((public_token) => {
        // send public_token to server
        const exchangePublicToken = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/exchange_public_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token: public_token }),
            });
            const data = await response.json();
            console.log({
                item_id: data.item_id,
            });
            setAuthorized(true);
            } catch (error) {
                console.error(error);
            }           
        }
        exchangePublicToken();
    }, []);

    const handleGetAccounts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/accounts',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }, 
        });
            const data = await response.json();
            setAccounts(data.accounts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            console.log(accounts);
        }
    }

    const config = {
        token: linkToken,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);

    return (<>
        <button onClick={() => open()} disabled={!ready}>
            Add bank account
        </button>

        {authorized ? 
            <button onClick={handleGetAccounts}>My Accounts</button>: <></>}

        {loading ? 
            <p>Loading...</p> : <></>}

        {accounts != null ?
            <AccountsTable data={accounts}/> : <></>} 
    </>);
}

export default PlaidLink;