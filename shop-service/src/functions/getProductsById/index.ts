import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import {getProductById} from "../../services";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`getProductsById lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=UTF-8",
    }
    try {
        const productId = event.pathParameters.productId;

        const product = await getProductById(productId)

        return formatJSONResponse({
            product,
        }, 200, headers);
    } catch (error) {
        return formatJSONResponse({
            message: "Product not found",
            error: error,
        }, error.statusCode,headers);
    }
};

export { getProductsById };
