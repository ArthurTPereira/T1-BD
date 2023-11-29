import { pool } from "./config/poolConfig";

export class BaseDAO {

    public async executeSQLCode(query : String){
        const client = await pool.connect();

        // Executa a query
        const result = await client.query(query); 
        // Libera a conexão
        client.release();

        return result;
    }
}