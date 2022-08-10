import {catalogBatchProcess} from "@functions/catalogBatchProcess";

import AWS from 'aws-sdk-mock';

const url = 'test.csv'

describe('testing catalogBatchProcess', () => {
    afterEach(() => {
        AWS.restore('SNS');
    });

    it('Should work correctly', async () => {
        AWS.mock('S3', 'getSignedUrl', `https://${url}`);

        const event = {
            queryStringParameters: {name: url},
        };

        const res = await catalogBatchProcess(event);
        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.body)).toEqual({signedUrl: `https://${url}`});
    });
});
