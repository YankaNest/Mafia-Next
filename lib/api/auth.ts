// import axios from 'axios';

// interface AuthResponse {
//     jwtToken: string;
//     refreshToken: string;
//   }

// const API_BASE_URL = 'api/user'; // Замените на ваш базовый URL

// // Регистрация пользователя
// export const registerUser = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
//   profileImage: string
// ) => {
//   const response = await axios.post(`${API_BASE_URL}/create`, {
//     firstName,
//     lastName,
//     email,
//     password,
//     profileImage,
//   });

//   return response.data; // Возвращает данные ответа
// };

// // Авторизация пользователя
// export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
//   const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, {
//     email,
//     password,
//   });

//   return response.data; // Возвращает accessToken и refreshToken
// };

// // Обновление токена
// export const refreshToken = async (refreshToken: string) => {
//   const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
//     refreshToken,
//   });

//   return response.data; // Возвращает новый accessToken и refreshToken
// };

// interface AuthResponse {
//   jwtToken: string;
//   refreshToken: string;
// }


// const ProfileImage = null
// Регистрация пользователя
// export const registerUser = async (
//   FirstName: string,
//   LastName: string,
//   Email: string,
//   Password: string,
//   PhoneNumber: string
// ) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       FirstName,
//       LastName,
//       Email,
//       Password,
//       ProfileImage,
//       PhoneNumber
//     }),
//   };

//   try {
//     const response = await fetch(`${API_BASE_URL}/create`, options);
//     console.log(response);
    
//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error('Registration failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// Регистрация пользователя с использованием multipart/form-data
// export const registerUser = async (
//   FirstName: string,
//   LastName: string,
//   Email: string,
//   Password: string,
//   PhoneNumber: string,
//   ProfileImage?: File // Добавляем изображение профиля как файл (необязательный параметр)
// ) => {
//   // Создаем объект FormData
//   const formData = new FormData();
  
//   // Добавляем данные в FormData
//   formData.append('FirstName', FirstName);
//   formData.append('LastName', LastName);
//   formData.append('Email', Email);
//   formData.append('Password', Password);
//   formData.append('PhoneNumber', PhoneNumber);

//   // Если изображение профиля передано, добавляем его в FormData
//   // if (ProfileImage) {
//   //   formData.append('ProfileImage', ProfileImage);
//   // } else {
//   //   formData.append('ProfileImage', '')
//   // }

//   console.log('formData FirstName =>',formData.get('FirstName'));
//   console.log('formData LastName =>',formData.get('LastName'));
//   console.log('formData Email =>',formData.get('Email'));
//   console.log('formData Password =>',formData.get('Password'));
//   console.log('formData number =>',formData.get('PhoneNumber'));
//   console.log('formData ProfileImage =>',formData.get('ProfileImage'));


//   console.log('ProfileImage', ProfileImage);
  
  

//   const options = {
//     method: 'POST',
//     body: formData, // Передаем FormData как тело запроса
//   };

//   try {
//     const response = await fetch(`${API_BASE_URL}/create`, options);
//     console.log(response);
//     console.log('options =>',options.body.get('PhoneNumber'));

//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error('Registration failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const registerUser = async (
//   FirstName: string,
//   LastName: string,
//   Email: string,
//   Password: string,
//   PhoneNumber: string,
//   ProfileImage?: string | null // Опциональный параметр, может быть строкой или null
// ) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/create`, {
//       FirstName,
//       LastName,
//       Email,
//       Password,
//       ProfileImage: ProfileImage || null, // Отправляем null, если ProfileImage не передано
//       PhoneNumber
//     }, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });

//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Registration failed');
//   }
// };

const API_BASE_URL = '';

export const registerUser = async (
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  PhoneNumber: string,
  ProfileImage?: File | null // Опциональный параметр, может быть файлом или null
) => {
  const formData = new FormData();

  // Добавляем все поля, даже если они пустые
  formData.append('FirstName', FirstName);
  formData.append('LastName', LastName);
  formData.append('Email', Email);
  formData.append('Password', Password);
  formData.append('PhoneNumber', PhoneNumber);

  // Если файл не передан, добавляем пустую строку
  formData.append('ProfileImage', ProfileImage || '');

  // Логируем данные перед отправкой
  console.log('Передаваемые данные:');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      body: formData,
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Логируем тело ответа сервера
      console.error('Server response:', errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    return await response; // Возвращает данные успешной регистрации
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
    const response = await fetch(`${API_BASE_URL}/login`, options);
    if (response.ok) {
      return await response.json(); // Возвращает accessToken и refreshToken
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Обновление токена
export const refreshToken = async (refreshToken: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, options);
    if (response.ok) {
      return await response.json(); // Возвращает новый accessToken и refreshToken
    } else {
      throw new Error('Token refresh failed');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

