import {ValidationError} from "../services/validationError";

export const validateProductData = (productData: any) => {
    const { title, price } = productData;
    if (!title || typeof title !== 'string' || !price || isNaN(price) || price < 0) {
        throw new ValidationError('Invalid product data');
    }
};