import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from '../mock'


export const getProductById: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`getProductById lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=UTF-8",
    }
    try {
        const productId = event.pathParameters.productId;

        const product = new Promise((res) => {
            const currentProduct = products.find(product => product.id === productId)
            res(currentProduct)
        })

        const videoGamesProduct = await product
        return formatJSONResponse({
            videoGamesProduct,
            headers,
        }, 200);
    } catch (error) {
        return formatJSONResponse({
            message: error.code,
            error: error,
        }, error.statusCode);
    }
};

export const main = middyfy(getProductById);
