import {connectToDB} from "../db";

export const getAllProducts = async () => {

    return await connectToDB(async (client) => {
        const { rows: products } = await client.query(`
        SELECT product.id, product.title, product.description, product.price, stock.count
        FROM products AS product
        INNER JOIN 
        stocks AS stock
        ON product.id = stock.product_id;
    `);
        return products;
    });
};


export const getProductById = async (id: string) => {
    return await connectToDB(async (client) => {
        const { rows: products } = await client.query(
            `
        SELECT product.id, product.title, product.description, product.price, stock.count
        FROM products AS product
        INNER JOIN 
        stocks AS stock
        ON product.id = stock.product_id
        WHERE product.id = $1;
    `,
            [id]
        );
        return products;
    })
}

export const createProduct = async (product) => {
    return await connectToDB(async ( client ) => {
        const response = await client.query(
            `INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id`,
            [product.title, product.description, product.price]
        );
        const { id } = response.rows[0];
        const count = product.count || 0;

        await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, count]);
        return { ...product, id, count };
    })
}