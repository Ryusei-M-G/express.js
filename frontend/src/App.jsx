import { useState, useEffect, use } from 'react'
import './App.css'
import js from '@eslint/js';

function App() {
  const [error,setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [serverUrl, setServerUrl] = useState('http://localhost:3000');
  const [text,setText] = useState('sample text');
 
  const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(serverUrl);
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setText(jsonData);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

  const eventHandle = () =>{
    fetchData();
  }

  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <div className='text-center'>
      <button className='border rounded-2xl p-2 m-4' onClick={eventHandle}>button</button>
      <div>
        {}
      </div>
    </div>
  );
}

export default App
