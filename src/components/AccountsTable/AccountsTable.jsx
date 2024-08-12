import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import getData from '../../utils/getData';
import { useAuth0 } from "@auth0/auth0-react";
        
const AccountsTable = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [accounts, setAccounts] = useState()
    const [error, setError] = useState("");

    const getAccounts = async () => {
        try {
            const data = await getData('accounts', user.email);
            const parsedData = await data?.accounts?.map((account) => {
                return {
                    number: account.mask,
                    name: account.name,
                    balance: `$${account.balances.current.toFixed(2)}`,
                }
            });
            setAccounts(parsedData);
            if (data.error){
                setError(data.error)
            }
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
        if(isAuthenticated){
            getAccounts();
        }
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
        <h2>Accounts</h2>
        {error && <p>{error}</p>}
        {accounts?.length > 0 &&
            <DataTable value={accounts}>
                {columns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header}/>
                ))}
            </DataTable>
        }
    </>)
}

export default AccountsTable;