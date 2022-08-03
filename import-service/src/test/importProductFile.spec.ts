import AWS from 'aws-sdk-mock';
import {importProductsFile} from "@functions/importProductsFile";
import {event} from "./event";
const SIGNED_URL =
    'https://aws-pic-app-products-upload.s3.eu-west-1.amazonaws.com/uploaded/example.csv?AWSAccessKeyId=ASIAQPQ2FGPQC2SSKTSI&Content-Type=text%2Fcsv&Expires=1656968999&Signature=%2FzIbka9y3dFgpvLl5dSoG3z0KI0%3D&X-Amzn-Trace-Id=Root%3D1-62c353a2-6b725ab2392845236474ebcd%3BParent%3D753f821478139214%3BSampled%3D0&x-amz-security-token=IQoJb3JpZ2luX2VjEG0aCWV1LXdlc3QtMSJHMEUCIDu0HY1gsBmRO0WmoOhb%2Bubs%2B59KKHuZuPdVu%2FT%2FNJ6OAiEA1RdbFshXft4wlUxBMYCCTWZXVBTa5g8Fl2tKjhjKeYIqqAMIlv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwMzMzNDA4NjM0NTYiDDAQC%2Bz9GJD%2FDQPNeyr8AoVERpfVZpHNWve28HzKkrkwqsLrJxG1NKsTURJ%2BLcluEtnY17ifPbWaTwxZa7qg8tUxISclUI0pxaExY9n2l%2F1kd9%2FzEUSckK3SPO6yeHKYgRsXih7NEsEdjh1%2FXzzsbsIATrWiC9soZr%2Bqpq6vgpKjmZmYENTWTpjeb7fvXbexQ7uU%2FE6YnqOUZsGFezOAQZGuWlI46x49QHtaVSNTlEwwDcZQ%2FW%2FpYNSRVGMj9XQXeD48WZMMwa6T1SmxmOZLD6Y35JEpGOlol4uPvfgNkdBXf0tXII%2Fx4pc%2FOdViRZjb1StFiLLMLpWq0Cx7i3gWOIDOiu%2FAqDSINtbdqaqtWDOeiB1ReyIDkELpPfDVtCDFOYS5c70e1og6GsXGiXZH0ymVo75rkSsgMawZ2SEvH0ZLIvakN6bSR5FYll3xelrEzQ0gWClh5Z2WFWi1y56JGRara3ti5OCK9ZrUTya9pTuaQaVBtefWhtE%2Bw3UdQITy74xVtf12yOst8vnXMKKnjZYGOp0BbiM86X%2BJvzVBRld7lnKfVP%2BiX2i3%2BY2INP5B%2F1Us3OMP1sjI87cRhvlGhrtPYoS0BeuT0eQgxanLISm4tGbkVKWJ3zktdgKDbxbI6EoXX8SNzEncPqyDAYRfb93yUhVqWHFY%2FlDoz95F15iML4wZYW0LtFaDpL6UTPS6JC8qNJccMx7lj4BzhLMoVxpdYz1NPsd8qSZ9NSufBSctMQ%3D%3D';


const putObjectMock = jest.fn(() => ({
    promise: jest.fn()
}));

describe('Given the importProductsFile lambda function', () => {
    let response;
    let result;

    beforeEach(async () => {
        AWS.mock('S3', 'getSignedUrl', SIGNED_URL);
        response = await importProductsFile(event);
        result = JSON.parse(response.body);
    });

    describe('and when it is called', () => {
        it('Then it should return the signed url', () => {
            expect(result).toEqual(SIGNED_URL);
        });
    });

    it("has to mock s3#putObject", async () => {
        const params = {
            Bucket: "test1",
            Key: "test2",
            ContentType: "application/json",
            Body: "test3",
        };

        await importProductsFile(event); // Call the handler to then assert against the mock params

        expect(putObjectMock).toHaveBeenCalledWith(params);
    });
});