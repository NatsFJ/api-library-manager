import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
});

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Database connected sucessfully");
    } catch (error) {
        console.log("Database connection failed");
    }

}

connectDatabase();

export default client;

