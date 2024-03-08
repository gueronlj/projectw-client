/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = ({ linkToken }) => {
    const onSuccess = useCallback((public_token) => {
        // send public_token to server
        fetch('http://localhost:3000/api/set_access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
        })
        const response = fetch('http://localhost:3000/api/exchange_public_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
        });

        console.log(response);

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