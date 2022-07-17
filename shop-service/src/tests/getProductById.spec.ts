import { getProductById } from '@functions/getProductById/handler'
const mockedId = {
    pathParameters: {
        productId: '1'
    }
}

const mockedSuccessResponse = {
    statusCode: 200,
    body: JSON.stringify(  {
        id: "1",
        description: "Video game",
        price: 600,
        title: "Marvel's Spider Man",
        image: 'https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png?w=230',
    },),
}


describe('getProductsById', () => {

    it('getProductsById\'s callback called with correct params', async () => {
        const fn = jest.fn();
        await getProductById(mockedId, null, fn)
        expect(fn).toBeCalledWith(null, mockedSuccessResponse);
    });
});