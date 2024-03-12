/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const LiabilitiesTable = ({data}) => {

    const parsedData = {  
        name: data.name,
        balances: `$${data.balances?.current?.toFixed(2)}`
    }

    // return(<>
    //     { data != null &&           
    //         <DataTable value={parsedData} tableStyle={{ minWidth: '50rem' }}>
    //             <Column field="name" header="Name" />
    //             <Column field="balances" header="Amount" />
    //         </DataTable>}       
    // </>)
}
export default LiabilitiesTable;