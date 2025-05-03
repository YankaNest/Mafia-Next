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

  
  export const getUpcomingGame = async (): Promise<Game[]> => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/get-upcoming`, options);
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

// export const joinGame = async (gameId: string) => {
//   const session = await auth();
  
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${session?.token}`,
//     }
//   };

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/register/${gameId}`,
//       options
//     );
    
//     if (response.ok) {
//       return await response.body; // Возвращаем данные ответа
//     } else {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error('Error joining game:', error);
//     throw error;
//   }
// };

export const joinGame = async (gameId: string) => {
  const session = await auth();
  
  // if (!session?.token) {
  //   throw new Error('Требуется авторизация');
  // }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    }
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/register/${gameId}`,
      options
    );
    
    const responseData = await response.text(); // Сначала читаем как текст
    
    if (!response.ok) {
      // Пробуем распарсить как JSON (если приходит JSON-ошибка)
      try {
        const jsonError = JSON.parse(responseData);
        throw new Error(jsonError.message || jsonError.error || 'Ошибка записи');
      } catch {
        // Если не JSON, возвращаем текст ошибки
        throw new Error(
          responseData
            .replace('400 Bad Request: ', '')
            .replace('Bad Request: ', '')
            .trim()
        );
      }
    }

    // Пробуем распарсить успешный JSON ответ
    try {
      return JSON.parse(responseData);
    } catch {
      return responseData; // Возвращаем текст, если не JSON
    }

  } catch (error) {
    console.error('Error joining game:', error);
    
    // Преобразуем технические сообщения в пользовательские
    const errorMessage = error instanceof Error 
      ? error.message.includes('already registered')
        ? 'Вы уже записаны на эту игру'
        : error.message
      : 'Неизвестная ошибка';
    
    throw new Error(errorMessage);
  }
};

export const getRegistredGame = async (): Promise<Game[]> => {
  const session = await auth();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/get-registered`, options);
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

export const cancelRegistrationGame = async (gameId: string) => {
  const session = await auth();
  
  // if (!session?.token) {
  //   throw new Error('Требуется авторизация');
  // }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    }
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}games/cancel-registration/${gameId}`,
      options
    );
    
    if (response.ok) {
      return await response.ok;
      
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
};