import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const BalancesTable = ({data}) => {
    return(
        <DataTable value={data}>
            <Column field="date" header="Date" />
            <Column field="name" header="Name" />
            <Column field="amount" header="Amount" />
        </DataTable>
    )
}
export default BalancesTable;