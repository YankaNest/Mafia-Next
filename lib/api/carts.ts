'use server';
import { auth } from "@/auth";
import { ICart } from "@/interfaces/cart";

export const updateCard = async (productId: string, quantity: number)=> {
  const session = await auth();
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}cart/update`, options);
    if (response.ok) {
      return await response.ok;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

export const getCard = async ():Promise<ICart[]> => {
  const session = await auth();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}cart/get`, options);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

export const deleteCard = async () => {
  const session = await auth();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}cart/clear`, options);
    if (response.ok) {
      return await response.ok;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}