import { useState, useEffect } from 'react'
import AccountsTable from './components/AccountsTable/AccountsTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import LiabilitiesTable from './components/LiabilitiesTable/LiabilitiesTable';
import Recuring from './components/Recurring/recurring';
import Items from './components/Items/items';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header/header';
import SideMenu from './components/SideMenu/SideMenu';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'


function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({id: "007"});
  const [error, setError] = useState(null);
  const { user, isAuthenticated} = useAuth0();
  
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const generateToken = async () => {
    const response = await fetch(API_ENDPOINT +"/api/create_link_token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user_id: currentUser.id 
      }),
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
    if (isAuthenticated){
      setCurrentUser(
        {id: user.email}
      );
    }
  }, []);


  if (linkToken !== null){
    return(<>
      <Header/>
      <div className="main">
        <SideMenu
          linkToken={linkToken}/>

        <div className="content">
          {error && 
          <p>{error}</p>}

          <Routes>
            <Route path="/" element={<AccountsTable currentUser={currentUser}/>}/>
            <Route path="/transactions" element={<TransactionsTable currentUser={currentUser}/>}/>
            <Route path="/liabilities" element={<LiabilitiesTable currentUser={currentUser}/>}/>
            <Route path="/recurring" element={<Recuring currentUser={currentUser}/>}/>
            <Route path="/item" element={<Items currentUser={currentUser}/>}/>
          </Routes>
        </div>
      </div>
    </>);
  }
}

export default App
