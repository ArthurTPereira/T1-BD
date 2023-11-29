import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'boca-db',
    database: 'bocadb',
    password: 'superpass',
    port: 5432
  });
  