import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/api-gateway';
import {formatJSONResponse} from '@libs/api-gateway';
import {middyfy} from '@libs/lambda';
import {getAllProducts} from "../../services";


export const getProductsList: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`getProductById lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=UTF-8",
    }
    try {

        const products: any[] = await getAllProducts();

        return formatJSONResponse({
            products
        }, 200, headers);

    } catch (error) {
        return formatJSONResponse({
            message: error.code,
            error: error,
        }, error.statusCode, headers);
    }
};

export const main = middyfy(getProductsList);
