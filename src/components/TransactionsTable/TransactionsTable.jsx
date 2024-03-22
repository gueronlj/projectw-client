import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";

const TransactionsTable = ({currentUser}) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getTransactions = async () => {
        try {
            setLoading(true);
            const data = await getData('transactions', currentUser.id);
            setData(data.added);
            console.log(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTransactions();
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
            {error && <p>{error.message}</p>}
            {loading && <p>Loading...</p>}
            {data !== null &&
                <DataTable value={data} tableStyle={{ minWidth: '45rem' }}>
                    <Column field="date" header="Date" />
                    <Column field="name" header="Name" />
                    <Column field="amount" header="Amount" />
                </DataTable>}
        </div>
    )
}
export default TransactionsTable;