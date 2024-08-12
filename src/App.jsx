import { useEffect, useState } from 'react'
import Header from './components/Header/header';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css'
import Dashboard from './components/Dashboard/dashboard';
import LoginButton from './components/Header/Login/LoginButton';


function App() {

  const [linkToken, setLinkToken] = useState(null);
  const { isAuthenticated, isLoading } = useAuth0();
  
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const generateToken = async () => { 
      let user_id;
      isAuthenticated? user_id = user.email : user_id = "guest";
      const response = await fetch(API_ENDPOINT +"/api/create_link_token", {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              user_id: user_id
          }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
  };

  useEffect(() => {
      generateToken();
  }, []);

  return(
      <div>
          <Header/>
          { isLoading && <div className='main'>Checking for session...</div>}
          
          { !isAuthenticated ? 
              <h3>Please sign-in to see the dashboard.<LoginButton/></h3>
              :
              <Dashboard linkToken={linkToken}/>
          }
      </div>
  );
}

export default App
