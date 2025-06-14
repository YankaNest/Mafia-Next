'use server';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export const registerUser = async (
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  PhoneNumber: string,
  ProfileImage?: File | null // Опциональный параметр
) => {
  const formData = new FormData();

  formData.append('FirstName', FirstName);
  formData.append('LastName', LastName);
  formData.append('Email', Email);
  formData.append('Password', Password);
  formData.append('PhoneNumber', PhoneNumber);
  formData.append('ProfileImage', ProfileImage || '');

  // console.log('Передаваемые данные:');
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/create`, {
      method: 'POST',
      body: formData,
    });

    // console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
if (contentType.includes('application/json')) {
  const data = await response.json();
  return data;
} else {
  // Если нет JSON, вернуть пустой объект или null
  return null;
}
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Авторизация пользователя

export const loginUser = async (email: string, password: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/login`,{
      ...options,
      signal: AbortSignal.timeout(3000),
      
    });
    if (response.ok) {      
      return response.json(); // Возвращает accessToken и refreshToken
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Обновление токена
// export const refreshToken = async (refreshToken: string) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       "refreshToken": refreshToken,
//     }),
//   };

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/refresh-token`, options);
//     if (response.ok) {
//       console.log('REFRESH DONE!!')
//       return await response.json();
//        // Возвращает новый accessToken и refreshToken
//     } else {
//       // throw new Error('Token refresh failed');
//       const errorText = await response.text();
//         console.error('Refresh token server response:', errorText);
//         throw new Error(`Token refresh failed: ${errorText}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };


export const refreshToken = async (refreshToken: string) => {
  console.log('Sending refresh token:', refreshToken);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}user/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const text = (await response.text()) || 'Empty response body';
  console.log('Response status:', response.status);
  console.log('Response body:', text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text); // { jwtToken, refreshToken }
};




export const authenticate = async (
	prevState: string | undefined,
	formData: FormData
) => {
	console.log('form data =>',formData);
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Не правильная почта или пароль.';
				default:
					return 'Непредвиденная ошибка.';
			}
		}
		throw error;
	}
};

