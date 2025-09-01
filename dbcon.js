import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'postgres',
});



const dbConnection = async () => {
  try {
    await client.connect();
    console.log('sucsess connection');
    const values = ['sample user', 'sample text'];
      await client.query(insertQuery, values);

  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
    console.log('disconnect');
  }
}

const dbAdd = async(value1,value2) =>{
  const insertQuery = `
    INSERT INTO tables (users, text) 
    VALUES ($1, $2)
    ON CONFLICT (users) DO NOTHING;
`;
const values = [value1,value2];
  try{
    await client.connect();
    await client.query(insertQuery,values);
    console.log('add db');
  }catch(err){
    console.log(err);
  }finally{
    await client.end();
  }
}
const dbFetch = async()=>{
  try{
    await client.connect();
    //selectのquery後で書く
  }catch(err){
    console.log(err);
  }finally{
    await client.end();
  }
}

dbAdd('user2','test');

export default dbConnection;