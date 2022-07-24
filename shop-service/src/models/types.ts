export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
}

export interface ProductBody {
    title: string;
    description: string;
    price: number;
    count?: number;
}