import { Pool } from 'pg';

const { DBUSER, DBHOST, DBNAME, DBPASS } = process.env;
// Withot the non-null assertion operator it is not possible to get the port
// and parse it to int
const DBPORT: number = parseInt(process.env.DBPORT!);

const pool: Pool = new Pool({
  user: DBUSER,
  host: DBHOST,
  database: DBNAME,
  password: DBPASS,
  port: DBPORT
});

export default pool;
