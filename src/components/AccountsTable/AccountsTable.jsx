/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
const AccountsTable = ({ data }) => {
    console.log(data);
   
    const parsedData = data.map((account) => {
        return {
            number: account.mask,
            name: account.name,
            balance: `$${account.balances.current.toFixed(2)}`,
        }
    });

    const handleSelect = () => {
        console.log('selected');
    }

    const columns = [
        {field: 'number', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'balance', header: 'Balance'}
    ];

    return (
        <DataTable value={parsedData} tableStyle={{ maxWidth: '60rem' }}>
            {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} onClick={handleSelect}/>
            ))}
        </DataTable>
    )
}

export default AccountsTable;