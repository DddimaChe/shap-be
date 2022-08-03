import AWS from 'aws-sdk';
import {formatJSONResponse} from "../../lib/formatJSON";

const CONTENT_TYPE = 'text/csv';
const BUCKET = `import-service-cloudx-bucket`;
const REGION = `eu-west-1`;
const UPLOADED = 'uploaded/'

const headers = {
    "Access-Control-Allow-Origin": "*",
}

const importProductsFile = async (event) => {
    try {
        const s3 = new AWS.S3({ region: REGION });

        const { name } = event.queryStringParameters;

        if (!name) throw new Error('No file name provided');

        const params = {
            Bucket: BUCKET,
            Key: `${UPLOADED}${name}`,
            ContentType: CONTENT_TYPE,
        };

        const signedUrl = await new Promise((res, rej) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                if (err) rej(err);
                res(url);
            });
        });

        return formatJSONResponse({
            signedUrl,
        }, 200, headers);
    } catch (error) {
        return formatJSONResponse({
            error,
        }, error.statusCode || 500, headers);
    }
};

export { importProductsFile };