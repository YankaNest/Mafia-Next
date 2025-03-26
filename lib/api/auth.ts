import axios from 'axios';

interface AuthResponse {
    jwtToken: string;
    refreshToken: string;
  }

const API_BASE_URL = 'http://188.126.47.65/user'; // Замените на ваш базовый URL

// Регистрация пользователя
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profileImage: string
) => {
  const response = await axios.post(`${API_BASE_URL}/create`, {
    firstName,
    lastName,
    email,
    password,
    profileImage,
  });

  return response.data; // Возвращает данные ответа
};

// Авторизация пользователя
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, {
    email,
    password,
  });

  return response.data; // Возвращает accessToken и refreshToken
};

// Обновление токена
export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
    refreshToken,
  });

  return response.data; // Возвращает новый accessToken и refreshToken
};
