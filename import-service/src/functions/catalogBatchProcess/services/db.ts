
import { Client } from 'pg';


const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

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

const useDB = async (cb) => {
    const client = new Client(dbOptions);
    try {
        await client.connect();
        return await cb(client);
    } catch (e) {
        throw new Error(e.message);
    } finally {
        client.end();
    }
};

const validateProductData = (productData: any) => {
    const { title, price } = productData;
    if (!title || typeof title !== 'string' || !price || isNaN(price) || price < 0) {
        throw new Error('Invalid product data');
    }
};

const postCSVData = async (productsData) => {
    const products = productsData.map((productData) => {
        validateProductData(productData);
        return {
            title: productData.title,
            description: productData.description,
            price: productData.price,
            count: productData.count || 0,
        };
    });

    const dataToDB = products.map(async (product: any) => {
        return useDB(async (client) => {
            await client.query(`BEGIN`);
            try {
                const response = await client.query(
                    `INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id`,
                    [product.title, product.description, product.price]
                );
                const { id } = response.rows[0];
                await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, product.count]);
                await client.query(`COMMIT`);
                return { ...product, id };
            } catch (e) {
                await client.query(`ROLLBACK`);
                throw new Error(e.message);
            }
        });
    });

    return Promise.all(dataToDB);
};

export { postCSVData };