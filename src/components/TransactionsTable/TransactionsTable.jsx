/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TransactionsTable = ({data}) => {
    return(
        <DataTable value={data.added} tableStyle={{ maxWidth: '60rem' }}>
            <Column field="date" header="Date" />
            <Column field="name" header="Name" />
            <Column field="amount" header="Amount" />
        </DataTable>
    )
}
export default TransactionsTable;