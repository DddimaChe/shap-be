import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import {createProduct} from "../../services";
import {middyfy} from "@libs/lambda";

export const postProduct: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`postProduct lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json;charset=UTF-8",
    }

    try {
        if (!event.body) {
            return formatJSONResponse({message: "No valid data"}, 400)
        }

        const product = JSON.parse(event.body);

        const postProduct = createProduct(product)

        return formatJSONResponse({
            postProduct,
        }, 200, headers);

    } catch (error) {
        return formatJSONResponse({
            message: "Post product Error",
            error: error,
        }, error.statusCode || 500,headers);
    }
}

export const main = middyfy(postProduct);