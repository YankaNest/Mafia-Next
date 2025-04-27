export interface CreateProductPayload {
    name: string;
    description?: string;
    price: number;
    availableQuantity: number;
    category?: string;
    image: File; // файл изображения
  }
  
  export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    category: string;
    imageUrl: string;
    carts: null;
    orderDetails: null;
  }
  