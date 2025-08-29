import express from 'express'

const app = express();

app.get('/',(req,res)=>{
  res.send('res');
})

app.listen(3000,()=>{
  console.log('port:3000 server listening')
})