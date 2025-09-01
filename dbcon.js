import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});



const dbAdd = async (value1, value2) => {
  const insertQuery = `
    INSERT INTO tables (users, text) 
    VALUES ($1, $2)
    RETURNING *;
`;
  const values = [value1, value2];
  try {
    // プールからクライアントを取得し、クエリを実行し、クライアントをプールに返す
    // pool.query() がこれらすべてを自動で行ってくれる
    const res = await pool.query(insertQuery, values);
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error(err);
    // エラーを呼び出し元に伝えるために再スローする
    throw err;
  }
}
const dbFetch = async () => {

  //selectのquery後で書く

}

dbAdd('user2', 'test');
