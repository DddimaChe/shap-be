import AWS from 'aws-sdk';
import {parseStream} from "../../lib/parseStreams";

const REGION = `eu-west-1`;
const PARSED = 'PARSED'


const headers = {
    "Access-Control-Allow-Origin": "*",
}

const sendFileToBucket = async (records: any) => {
    const promises = records.map(async (record) => {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        const s3 = new AWS.S3({ region: REGION });

        const fileName = key.split('/').pop();

        const copyParams = {
            Bucket: bucket,
            CopySource: `${bucket}/${key}`,
            Key: `${PARSED}${fileName}`,
        };

        await s3.copyObject(copyParams).promise();

        const deleteParams = {
            Bucket: bucket,
            Key: `${key}`,
        };

        await s3.deleteObject(deleteParams).promise();
    });

    await Promise.all(promises);
};

const importFileParser = async (event: any) => {
    console.log('importFileParser: ',event);
    const awsS3 = new AWS.S3({ region: REGION });
    try {

        const streams = event.Records.map((record) => {
            const bucket = record.s3.bucket.name;
            const key = record.s3.object.key;
            const params = { Bucket: bucket, Key: key };
            return awsS3.getObject(params).createReadStream();
        });

        let parsedRecords;
        try {
            parsedRecords = await Promise.all(streams.map(parseStream));
        } catch (e) {
            throw new Error(e.message);
        }

        try {
            await sendFileToBucket(event.Records);
        } catch (e) {
            throw new Error(e.message);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(parsedRecords, null, 2),
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify(error.message),
        };
    }
};

export { importFileParser };