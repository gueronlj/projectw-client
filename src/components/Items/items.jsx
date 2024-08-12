import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";

const Items = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [data, setData] = useState(
        {
            "item_id":"", 
            "institution_id":"", 
            "billed_products":[]
        }
    );
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getItemInfo = async () => {
        try {
            setLoading(true);
            const data = await getData('item', user.email);           
            setData(data.item);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getItemInfo();
    }, []);

    if (isLoading){
        return(
            <h3>Loading...</h3>
        )
    }

    if (!isAuthenticated){
        return(
            <h3>Log in to view accounts</h3>
        )
    }
    
    return (
        <div>   
            {error && <p>{error.message}</p>}
            <h2>Item Info</h2>
            {loading ? <p>Loading...</p> 
                :
            <>
                {data && <>
                    <h4>ID: {data.item_id}</h4>
                    <h4>Institution: {data.institution_id}</h4>
                    {data.billed_products.map((product) => (
                        <p key={product}>{product}</p>
                    ))}
                </>} 
            </>}   
        </div>    
    );
}

export default Items;