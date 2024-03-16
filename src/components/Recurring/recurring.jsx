import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import getData from '../../utils/getData';

const Recuring = ({currentUser}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const getRecurring = async () => {
        try {
            setLoading(true);
            const data = await getData('transactions/recurring', currentUser.id);
            console.log(data);
            const parsedIncoming = data.incoming.map((item) => {
                return {
                    account_id: item.account_id,
                    description: item.description,
                    frequency: item.frequency,
                    average_amount: `$${item.average_amount.amount.toFixed(2)}`
                }
            });
        
            const parsedOutgoing = data.outgoing.map((item) => {
                return {
                    account_id: item.account_id,
                    description: item.description,
                    frequency: item.frequency,
                    average_amount: `$${item.average_amount.amount.toFixed(2)}`
                }
            });
            setData({
                incoming: parsedIncoming,
                outgoing: parsedOutgoing
            });
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    

    const incomingColumns = [
        {field: 'account_id', header: 'Account'},
        {field: 'description', header: 'Description'},
        {field: 'frequency', header: 'Frequency'},   
        {field: 'average_amount', header: 'Average'}
    ];

    const outgoingColumns = [
        {field: 'account_id', header: 'Account'},
        {field: 'description', header: 'Description'},
        {field: 'frequency', header: 'Frequency'},   
        {field: 'average_amount', header: 'Average'}
    ];

    useEffect(() => {
        getRecurring();
    }, []);

    return (
        <div>
            {error && <p>{error.message}</p>}
            {loading && <p>Loading...</p>}
            {data !== null &&<>
                <h2>Income</h2>
                <DataTable value={data.incoming} tableStyle={{ maxWidth: '45rem' }}>
                    {incomingColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header}/>
                    ))}
                </DataTable>
                
                <h2>Expenses</h2>
                <DataTable value={data.outgoing} tableStyle={{ maxWidth: '45rem' }}>
                    {outgoingColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header}/>
                    ))}
                </DataTable>
            </>}
            
        </div>
    )
}

export default Recuring;