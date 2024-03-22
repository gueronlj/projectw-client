import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";

const Items = ( {currentUser} ) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getItemInfo = async () => {
        try {
            setLoading(true);
            const data = await getData('item', currentUser.id);           
            console.log(data);
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
            {loading && <p>Loading...</p>}
            {data !== null && <>
                {data.billed_products.map((product) => (
                    <p key={product.field}>{product}</p>
                ))}
                <h3>ID: {data.item_id}</h3>
                <h3>Institution: {data.institution_id}</h3></>}     
        </div>    
    );
}

export default Items;