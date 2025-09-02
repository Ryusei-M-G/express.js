import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pool, { dbAdd,dbFetch } from './dbcon.js';
const app = express();

app.use(cors());
app.use(express.json());
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY_NAME = 'Tokyo';

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric&lang=ja`;


const fetchWeather = async () => {
  try {
    const res = await fetch(WEATHER_API_URL);//fetch
    const data = await res.json();
    if (res.ok) {
      //temp,description,humidityのみ
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      return { temp, description, humidity };
    } else {
      return 'failed'
    }
  } catch (error) {
    return error;
  }
}

//middle ware
const middleware = (req, res, next) => {
  console.log(`middleware ${new Date()} ${req.method} ${req.url}`)
  next();//next middleware
}

app.use(middleware);//middlewareの登録
//middlewareはhttpリクエストの度に呼び出される

app.get('/wt', async (req, res) => {
  const weatherData = await fetchWeather();
  res.json(weatherData);

  console.log(`クライアントへ送信: ${weatherData}`);
});

app.get('/db', async (req, res) => {
  const dbData = await dbFetch();
  res.json(dbData);
  console.log(`クライアントへ送信: ${dbData}`);
});

app.post('/add', async (req, res) => {
  const receivedData = req.body;
  console.log('クライアントから受信したデータ:', receivedData);
  dbAdd(receivedData.item1,receivedData.item2);

  // res.status(201).json({ 
  //   message: 'データの追加に成功しました',
  //   data: receivedData 
  // });
});

app.listen(3000, () => {
  console.log('port:3000 server listening')
})  