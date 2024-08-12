import { Route, Routes } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import AccountsTable from "../AccountsTable/AccountsTable";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import LiabilitiesTable from "../LiabilitiesTable/LiabilitiesTable";
import Recuring from "../Recurring/recurring";
import Items from "../Items/items";

const Dashboard = ({linkToken}) => {

    return (
        <div className="dashboard">
            <SideMenu linkToken={linkToken}/>

            <div className="content">
                <Routes>
                    <Route path="/" element={<AccountsTable/>}/>
                    <Route path="/transactions" element={<TransactionsTable/>}/>
                    <Route path="/liabilities" element={<LiabilitiesTable/>}/>
                    <Route path="/recurring" element={<Recuring/>}/>
                    <Route path="/item" element={<Items/>}/>
                </Routes> 
            </div>
        </div>    
    )
}

export default Dashboard;