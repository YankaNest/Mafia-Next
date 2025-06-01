import { auth } from "@/auth";
import { IUser } from "@/interfaces/user";

export const getUser = async ():  Promise<IUser> => {
  const session = await auth();

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    }
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/get`,
      options
    );
    
    if (response.ok) {
      return await response.json();
      
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};