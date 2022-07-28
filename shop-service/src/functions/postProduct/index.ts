import {formatJSONResponse, ValidatedEventAPIGatewayProxyEvent} from "@libs/api-gateway";
import {ValidationError} from "../../services/validationError";
import {addProduct} from "../../services";

const postProduct: ValidatedEventAPIGatewayProxyEvent<unknown> = async (event) => {
    console.log(`postProduct lambda called with ${event}`);
    const headers = {
        "Access-Control-Allow-Origin": "*",
    }
    try {
        if (!event.body) throw new ValidationError('No product data provided');

        const productData = JSON.parse(event.body);

        const result = await addProduct(productData);

        return formatJSONResponse({
            result,
        }, 200, headers);

    } catch (error) {
        console.log(event)
        return formatJSONResponse({
            message: `${event}`,
            error: error,
        }, error.statusCode || 500,headers);
    }
}

export {postProduct};