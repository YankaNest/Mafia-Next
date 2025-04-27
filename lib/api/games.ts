'use server';
import { auth } from "@/auth";
import { CreateGamePayload, Game } from "@/interfaces/game";

  export const createGame = async (gameData: CreateGamePayload) => {
    const session = await auth();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(gameData),
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/create`, options);
      if (response.ok) {
        return await response.ok; // Возвращаем ответ сервера
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  };

  export const getAllGame = async (): Promise<Game[]> => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/get-all`, options);
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