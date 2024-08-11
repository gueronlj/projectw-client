import { usePlaidLink } from 'react-plaid-link';
import { useCallback } from 'react';

const Linker = ({linkToken}) =>  {

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
                    user_id: user.email 
                }),
            });
            } catch (error) {
                console.log(error);
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
        <button onClick={() => open()} disabled={!ready}>
            Link Bank
        </button>
    )
}

export default Linker;