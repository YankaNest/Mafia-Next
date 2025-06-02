'use server';
import { auth } from "@/auth";
import { CreateProductPayload, IProduct } from "@/interfaces/product";

export const createProduct = async (productData: CreateProductPayload) => {
  const formData = new FormData();
  const session = await auth();

  formData.append('Name', productData.name);
  formData.append('Description', productData.description || '');
  formData.append('Price', productData.price.toString());
  formData.append('AvailableQuantity', productData.availableQuantity.toString());
  formData.append('Category', productData.category || '');
  formData.append('MainImage', productData.mainImage);
  if (Array.isArray(productData.images)) {
    productData.images.forEach((file) => {
      formData.append('Images', file);
  });
}
  console.log('FORMDATA', formData);

  const headers: Record<string, string> = {};
  if (session?.token) {
    headers['Authorization'] = `Bearer ${session?.token}`;
  }
  // Не указываем Content-Type, fetch сам выставит multipart/form-data с boundary

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/create`, {
    method: 'POST',
    headers,
    body: formData,
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return await response.ok;
};
  
export const getAllProduct = async (): Promise<IProduct[]> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/get-all`, options);
    if (response.ok) {
      return await response.json();
      
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
}