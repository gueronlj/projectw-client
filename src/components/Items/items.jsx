import { useEffect, useState } from 'react';
import getData from '../../utils/getData';

const Items = ( {currentUser} ) => {
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