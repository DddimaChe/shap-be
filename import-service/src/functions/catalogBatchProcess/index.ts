import AWS from 'aws-sdk';
import {postCSVData} from "@functions/catalogBatchProcess/services/db";
const REGION = `eu-west-1`;
const headers = {
    "Access-Control-Allow-Origin": "*",
}

const catalogBatchProcess  = async (event: any) => {
    console.log('Event', event);
    const sns = new AWS.SNS({ region: REGION });

    try {
        const products = event.Records.map((record) => JSON.parse(record.body));

        const productToBD = await postCSVData(products);

        await products.map(async (product) => {
            return sns
                .publish({
                    MessageAttributes: {
                        title: {
                            DataType: 'String',
                            StringValue: product.title,
                        },
                    },
                    Subject: `New product added: ${product.title}`,
                    Message: JSON.stringify(product),
                    TopicArn: process.env.SNS_TOPIC_ARN,
                })
                .promise();
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(productToBD, null, 2),
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error.message),
        };
    }
};

export { catalogBatchProcess  };