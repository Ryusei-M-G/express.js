import { useState, useEffect, } from 'react'
import './App.css'
import Temp from './temp';
import Form from './Form';

function App() {
  const [, setError] = useState();
  const [, setIsLoading] = useState(false);
  const [serverUrl,] = useState('http://localhost:3000');
  const [data, setData] = useState('sample text');

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
      setData(jsonData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const eventHandle = () => {
    fetchData();
  }

  const handleAdd =async(value1,value2) =>{
    const postData ={
      item1:value1,
      item2:value2,
    };

    setIsLoading(true);
    setError(null);

    try{
      const res = await fetch(`${serverUrl}/add`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if(!res.ok){
        throw new Error('HTTPerror',res.status);
      }

      const result = await res.json();
      console.log(`res: ${result}`);

      fetchData();
    }catch(e){
      setError(e.message);
      console.log(`erroe:${e}`);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='text-center color=011'>
      <button className='border rounded-2xl p-2 m-4' onClick={eventHandle}>button</button>
      <Temp data={data}></Temp>
      <Form onAdd={handleAdd}></Form>
      
    </div>
  );
}

export default App
