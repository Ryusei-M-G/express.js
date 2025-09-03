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



export const dbAdd = async (value1, value2) => {
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
    console.error('log:',err);
    // エラーを呼び出し元に伝えるために再スローする
    throw err;
  }
}

export const dbDel = async(id) =>{
  const deleteQuery = 'DELETE FROM tables WHERE id = $1 RETURNING *;';

try {
    // プールからクライアントを取得し、クエリを実行し、クライアントをプールに返す
    // pool.query() がこれらすべてを自動で行ってくれる
    const res = await pool.query(deleteQuery, [id]);
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('log:',err);
    // エラーを呼び出し元に伝えるために再スローする
    throw err;
  }
}
export const dbFetch = async () => {
  const selectQuery = 'SELECT * FROM tables ORDER BY created_at DESC;';
  try {
    const res = await pool.query(selectQuery);
    console.log(`log: fetch ${res.rowCount} data`);
    console.log(`log: ${res.rows}`);
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default pool;