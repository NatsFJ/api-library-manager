import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function database() {
    try {
        await client.connect();
        console.log("Database connected sucessfully");
    } catch (error) {
        console.log("Database connection failed");
    }

}

database();

export default client;

