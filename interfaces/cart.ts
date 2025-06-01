import { IProduct } from "./product";

export interface ICart {
    id: string;
    userId: string;
    user:  null;
    productId: string;
    product: IProduct;
    quantity: number;
    addedAt: string;
}