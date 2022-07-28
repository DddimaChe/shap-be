import {connectToDB} from "../db";
import {ValidationError} from "./validationError";
import {validateProductData} from "../validation";

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


const createProduct = ({ title, description = '', price }) => {
    return {title, description, price};
};


export const addProduct = async (productData: any) => {
    validateProductData(productData);
    const product = createProduct(productData);

    return await connectToDB(async (client) => {
        try {
            const response = await client.query(
                `INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id`,
                [product.title, product.description, product.price]
            );
            const { id } = response.rows[0];
            const count = productData.count || 0;

            await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, count]);
            return { ...product, id, count };
        } catch (e) {
            throw new ValidationError(e.message);
        }
    });
};
