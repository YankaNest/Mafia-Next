import { IUser } from "./user";

export interface IOrder {
  id: string;
  userId: string;
  user: IUser | null;
  orderDate: string;
  totalAmount: number;
  status: number;
  orderDetails: orderDetails[];
  address: string;
  paymentMethod: number
}

export interface orderDetails{
  id: string;
  orderId: string;
  order: null | unknown;
  productId: string;
  product: null | unknown;
  quantity: number;
  price: number;
}