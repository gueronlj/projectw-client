import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [linkToken, setLinkToken] = useState(null);

  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

  const generateToken = async () => {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <>
      <h1>Project W</h1>
      {linkToken != null ? <>
        <div className="card"> we linked! </div>
      </> : <></>}   
    </>
  )
}

export default App
