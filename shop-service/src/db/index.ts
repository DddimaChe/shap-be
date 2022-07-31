import { Client } from 'pg';
import {formatJSONResponse} from "@libs/api-gateway";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env

const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
};

export const connectToDB = async (clientBD) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        return await clientBD(client);
    } catch (e) {
        return formatJSONResponse( { message:  'Connection to db failed' }, 500);
    } finally {
        client.end();
    }
};
