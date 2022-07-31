import { getProductsList } from "@functions/getProductsList/handler"
import products from '../functions/mock.js'

const fn = jest.fn();
describe('getProductsList', () => {
    const mockedSuccessResponse = {
        statusCode: 200,
        body: JSON.stringify(products),
    }

    it('index function with mock data', async () => {
        await getProductsList({}, null, fn)
        expect(fn).toBeCalledWith(mockedSuccessResponse);
    });
});