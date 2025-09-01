import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'postgres',
});

const insertQuery = `
    INSERT INTO tables (users, text) 
    VALUES ($1, $2)
    ON CONFLICT (users) DO NOTHING;
`;

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

dbConnection();

export default dbConnection;