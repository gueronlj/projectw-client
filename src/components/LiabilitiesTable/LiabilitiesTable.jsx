import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";

const LiabilitiesTable = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLiabilities = async () => {
        try {
            setLoading(true);
            const data = await getData('liabilities', user.email);
            setError(data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLiabilities();
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
    
    return(
        <div>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            { data !== null && !error &&          
                <DataTable value={data.balances.current}>
                    <Column field="name" header="Name" />
                    <Column field="balances" header="Amount" />
                </DataTable>}       
        </div>
    )
}
export default LiabilitiesTable;