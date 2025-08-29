import express from 'express'

const app = express();

//middle ware
const middleware = (req,res,next) =>{
  console.log(`middleware ${new Date()} ${req.method} ${req.url}`)
  next();//next middleware
}

app.use(middleware);//middlewareの登録
//middlewareはhttpリクエストの度に呼び出される

app.get('/',(req,res)=>{//第一引数:request object,第二引数はresponse object
  res.send('GET res');
})

app.listen(3000,()=>{
  console.log('port:3000 server listening')
})