export const event = {
    queryStringParameters: { name: 'test.csv' },
    Records: [
        {
            s3: {
                s3SchemaVersion: '2.0',
                configurationId: 'import-service-dev-importFileParser-9eceafef0fe575eb52543c9070542d86',
                bucket: {
                    name: 'import-service-cloudx-bucket',
                    arn: 'arn:aws:s3:::import-service-cloudx-bucket',
                },
                object: {
                    key: 'uploaded/test.csv',
                    size: 5,
                    eTag: 'gns231uys45598hnsdg52',
                    sequencer: '018ht23422bn7m7n',
                },
            },
        },
    ],
}