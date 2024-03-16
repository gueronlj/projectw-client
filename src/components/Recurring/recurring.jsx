import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Recuring = ({data}) => {
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

    return (
    <div>
        <h2>Income</h2>
        <DataTable value={parsedIncoming} tableStyle={{ maxWidth: '45rem' }}>
            {incomingColumns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header}/>
            ))}
        </DataTable>
        
        <h2>Expenses</h2>
        <DataTable value={parsedOutgoing} tableStyle={{ maxWidth: '45rem' }}>
            {outgoingColumns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header}/>
            ))}
        </DataTable>
    </div>
  
    )
}

export default Recuring;