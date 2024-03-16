import { useState, useEffect } from 'react'
import './App.css'
import PlaidLink from './components/PlaidLink/PlaidLink';

function App() {
  const [linkToken, setLinkToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({id: "007"});

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
  }, []);

  return (
    <>
      {linkToken != null && <PlaidLink linkToken={linkToken} />}   
    </>
  )
}

export default App
