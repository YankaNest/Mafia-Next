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

export const deleteProduct = async (productId: string) => {
  const session = await auth();
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/delete/${productId}`,
      options
    );
    if (response.ok) {
      return true;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error);
    throw error;
  }
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
  const session = await auth();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/get/${productId}`, options);
    if (response.ok) {
      return await response.json();
    } else {
      return null; // Или throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null; // Или throw error;
  }
};


export const updateProduct = async (productId: string, productData: Partial<IProduct>) => {
  const session = await auth();

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(productData),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}products/update/${productId}`, options);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.ok;
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error);
    throw error;
  }
};
