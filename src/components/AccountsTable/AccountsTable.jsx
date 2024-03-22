import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";
        
const AccountsTable = ( {currentUser} ) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const [accounts, setAccounts] = useState(null)

    const getAccounts = async () => {
        try {
            const data = await getData('accounts', currentUser.id);
            console.log(data);
            const parsedData = data.accounts.map((account) => {
                return {
                    number: account.mask,
                    name: account.name,
                    balance: `$${account.balances.current.toFixed(2)}`,
                }
            });
            setAccounts(parsedData);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {field: 'number', header: '#'},
        {field: 'name', header: 'Name'},
        {field: 'balance', header: 'Balance'}
    ];

    useEffect(() => {
        getAccounts();
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

    return (<>
        {accounts !== null && 
            <DataTable value={accounts} tableStyle={{ minWidth: '45rem' }}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header}/>
                ))}
            </DataTable>
        }
    </>)
}

export default AccountsTable;