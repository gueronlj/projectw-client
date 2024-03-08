/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({ linkToken }) => {
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
            } catch (error) {
                console.error(error);
            }           
        }
        exchangePublicToken();
    }, []);

    const config = {
        token: linkToken,
        onSuccess,
    };
    const { open, ready } = usePlaidLink(config);

    return (
        <button onClick={() => open()} disabled={!ready}>
            Add bank account
        </button>
    );
}

export default PlaidLink;