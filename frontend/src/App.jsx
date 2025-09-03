import { useState, useEffect, } from 'react'
import './App.css'
import Temp from './temp';
import Form from './Form';

function App() {
  const [, setError] = useState();
  const [, setIsLoading] = useState(false);
  const [serverUrl,] = useState('http://localhost:3000');
  const [data, setData] = useState('sample text');
  const [DBData, setDBData] = useState([]);
  const [idText, setIdText] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${serverUrl}/wt`);
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
      const jsonData = await response.json();
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

  const handleAdd = async (value1, value2) => {
    const postData = {
      item1: value1,
      item2: value2,
    };

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${serverUrl}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        throw new Error('HTTPerror', res.status);
      }

      const result = await res.json();
      console.log(`res: ${result}`);

      fetchData();
    } catch (e) {
      setError(e.message);
      console.log(`erroe:${e}`);
    } finally {
      setIsLoading(false);
      fetchhandle();
    }
  }

  const delHandle = async(id) =>{
     const postData = {
      id: id
    };

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${serverUrl}/del`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        throw new Error('HTTPerror', res.status);
      }

      const result = await res.json();
      console.log(`res: ${result}`);

      fetchData();
    } catch (e) {
      setError(e.message);
      console.log(`erroe:${e}`);
    } finally {
      setIsLoading(false);
      fetchhandle();
    }
  }
  const delClickHandle = ()=>{
    delHandle(idText);
  }

  const fetchhandle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${serverUrl}/db`);
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setDBData(jsonData);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
    fetchhandle();
  }, []);

  return (
    <div className='text-center color=011'>
      <button className='border rounded-2xl p-2 m-4' onClick={eventHandle}>button</button>
      <Temp data={data}></Temp>
      <Form onAdd={handleAdd}></Form>
      <button type="button" className="cursor-grab border rounded-2xl pr-4 pl-4 p-1  text-2xl" onClick={fetchhandle}>fetch</button>
      <div>{DBData.map((e) => {
        return (<li key={e.id}>
          ID: {e.id} - Item1: {e.users}, Item2: {e.text}
        </li>);
      })}</div>

      <div>
        <input className='border p-2' placeholder='id' onChange={(e) => setIdText(e.target.value)}></input>
        <button type='button' className='border p-2' onClick={delClickHandle}>del</button>
      </div>
    </div>
  );
}

export default App
