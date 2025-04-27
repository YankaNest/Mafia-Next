import Credentials from 'next-auth/providers/credentials';
import { loginUser,  refreshToken as refreshTokenAPI } from './lib/api/auth'; // Ваши методы авторизации и обновления токена
import NextAuth, { User } from 'next-auth';
import { z } from 'zod';
import { AdapterUser } from 'next-auth/adapters';
import { IauthResponse } from './interfaces/authResponse'; // Интерфейс ответа от вашего API

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/home'
	},
	providers: [
		Credentials({
			credentials: {
				email: {}, // Поле email в форме авторизации
				password: {} // Поле password в форме авторизации
			},
			async authorize(credentials) {
				console.log('Credential',credentials)

                const parseCredentials = z
					.object({
						email: z.string(),
						password: z.string() /* .min(6) */
					})
					.safeParse(credentials);

				if (!parseCredentials.success) {
					return null;
				}
				console.log('parseCredential', parseCredentials)
				const response: IauthResponse = await loginUser(
					parseCredentials.data.email,
					parseCredentials.data.password
				);
				console.log(response);

				const user: User = {
					token: response.jwtToken,
                    refreshToken: response.refreshToken,
					roles: response.roles
				};
				console.log('userROLE',user.roles);
				
				return user;
			}
		})
	],

	callbacks: {
		async jwt({ token, user }) {
			console.log('user', user);
			
			if (user) {
				token.user = user; // Сохраняем данные пользователя в токен
				token.token = user.token; // Сохраняем access token в токен
				token.refreshToken = user.refreshToken; // Сохраняем refresh token в токен
				token.tokenExpires = Date.now() + 15 * 60 * 1000; // Устанавливаем время истечения access token (например, 15 минут)
			}

			// Проверяем, истёк ли access token
			if (Date.now() < (token.tokenExpires as number || 0)) {
				return token; // Если токен ещё действителен, возвращаем его
			}

			// Если access token истёк, обновляем его с помощью refresh token
			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			console.log(token);
			session.token = token.token as string; // Добавляем access token в сессию
			session.refreshToken = token.refreshToken as string;
			session.user = token.user as AdapterUser & User; // Добавляем данные пользователя в сессию
			return session; // Возвращаем обновленную сессию
		},
        // authorized({ auth, request: { nextUrl } }) {
		// 	const pathname = nextUrl.pathname;
		// 	const isOnDashboard =
		// 		pathname.startsWith('/home/game-signup') ||
		// 		pathname.startsWith('/home/') ||
		// 		pathname.startsWith('/home/profile');
		// 	const isLoggedIn = !!auth?.user;

		// 	if (isOnDashboard || pathname === '/') {
		// 		return isLoggedIn;
		// 	} else if (isLoggedIn) {
		// 		//const credentials = auth?.user;
		// 		//return Response.redirect(new URL(`/${credentials}`, nextUrl));
		// 	}

		// 	return true;
		// }
	}
});

// Функция для обновления access token с использованием refresh token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
	try {
		const refreshedTokens = await refreshTokenAPI(token.refreshToken); // Вызываем ваш метод обновления токена

		return {
			...token,
			token: refreshedTokens.accessToken,
			refreshToken: refreshedTokens.refreshToken || token.refreshToken, // Обновляем refresh token только если он предоставлен API
			tokenExpires: Date.now() + 15 * 60 * 1000 // Устанавливаем новое время истечения токена (например, 15 минут)
		};
	} catch (error) {
		console.error('Ошибка при обновлении токена:', error);

		return {
			...token,
			error: 'RefreshAccessTokenError'
		};
	}
}

// Расширяем интерфейсы NextAuth.js для поддержки кастомных данных пользователя и токена
declare module 'next-auth' {
	interface Session {
		token: string; // Access Token из сессии
		refreshToken: string; // Refresh Token из сессии
		user: User;
	}
	interface User {
		token: string; // Access Token от вашего API
		refreshToken: string; // Refresh Token от вашего API
		roles: string;
	}
	interface JWT {
        user: User;
		token: string;
		refreshToken: string;
	}
}
