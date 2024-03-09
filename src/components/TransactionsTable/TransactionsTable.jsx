/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from "react";

const TransactionsTable = () => {
    const [showTable, setShowTable] = useState(false);
    const [transactionData, setTransactionData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getTransactions = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/transactions', {
                method: 'GET',            
            });
            const data = await response.json();
            if (data.error != null ) {
                setError(error);
                setIsLoading(false);
                return;
            } else {
                //TO FIX: Must be fetched twice to get results. Possibly due to no 'cursor' in the first fetch
                //Checking for empty list
                if (data.added.length === 0){
                    setError("No transactions found");
                    setIsLoading(false);
                    return;
                } else {
                    console.log(data);
                    setTransactionData(data);
                    setShowTable(true);
                    setIsLoading(false);
                    setError(null);
                }
            }        
        } catch (error) {
            console.error(error);
        }
    }

    return(<>
        <button onClick={getTransactions}>
            {isLoading ? "Loading..." : `Show transactions`}
        </button>
        {showTable && 
            <DataTable value={transactionData.added} tableStyle={{ maxWidth: '60rem' }}>
                <Column field="date" header="Date" />
                <Column field="name" header="Name" />
                <Column field="amount" header="Amount" />
            </DataTable>}
        {error != null && <h4>{error}</h4>}
    </>)
}
export default TransactionsTable;