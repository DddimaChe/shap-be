import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import products from '../mock'


export const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`getProductById lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=UTF-8",
    }
    try {

        const productsPromise = new Promise((res) => {
            res(products)
        })

        const videoGamesProducts = await productsPromise
        return formatJSONResponse({
            videoGamesProducts
        }, 200, headers);
    } catch (error) {
        return formatJSONResponse({
            message: error.code,
            error: error,
        }, error.statusCode, headers);
    }
};

export const main = middyfy(getProductsList);
