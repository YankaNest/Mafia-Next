'use server';
import { auth } from "@/auth";
import { IOrder } from "@/interfaces/order";

export const createOrder = async (address: string, paymentMethod: number) => {
  const session = await auth();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({
      address,
      paymentMethod,
    }),
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}orders/create`, options);
    if (response.ok) {
      return await response.ok;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getOrders = async (): Promise<IOrder[]> => {
  const session = await auth();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}orders/get`, options);
    if (response.ok) {
      return await response.json();
      
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
}