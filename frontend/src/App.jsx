import { useState, useEffect, } from 'react'
import './App.css'

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='text-center'>
      <button className='border rounded-2xl p-2 m-4' onClick={eventHandle}>button</button>
      <div className='border rounded-2xl p-4 m-4'>
        <p className='text-2xl'>温度: {data.temp} ℃</p>
        <p>天気: {data.description}</p>
        <p>湿度: {data.humidity} %</p>
      </div>
    </div>
  );
}

export default App
