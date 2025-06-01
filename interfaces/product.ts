export interface CreateProductPayload {
    name: string;
    description?: string;
    price: number;
    availableQuantity: number;
    category?: string;
    mainImage: File;
    images: File[];
  }
  
  export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    category: string;
    mainImageUrl: string;
    carts: null;
    orderDetails: string | null;
  }
  