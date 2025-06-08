// import Credentials from 'next-auth/providers/credentials';
// import { loginUser,  refreshToken as refreshTokenAPI } from './lib/api/auth'; // Ваши методы авторизации и обновления токена
// import NextAuth, { User } from 'next-auth';
// import { z } from 'zod';
// import { AdapterUser } from 'next-auth/adapters';
// import { IauthResponse } from './interfaces/authResponse'; // Интерфейс ответа от вашего API
// import { JWT } from 'next-auth/jwt';


// export const { handlers, auth, signIn, signOut } = NextAuth({
// 	pages: {
// 		signIn: '/home'
// 	},
// 	providers: [
// 		Credentials({
// 			credentials: {
// 				email: {}, // Поле email в форме авторизации
// 				password: {} // Поле password в форме авторизации
// 			},
// 			async authorize(credentials) {
// 				console.log('Credential',credentials)

//                 const parseCredentials = z
// 					.object({
// 						email: z.string(),
// 						password: z.string() /* .min(6) */
// 					})
// 					.safeParse(credentials);

// 				if (!parseCredentials.success) {
// 					return null;
// 				}
// 				console.log('parseCredential', parseCredentials)
// 				const response: IauthResponse = await loginUser(
// 					parseCredentials.data.email,
// 					parseCredentials.data.password
// 				);
// 				console.log(response);

// 				const user: User = {
// 					token: response.jwtToken,
//                     refreshToken: response.refreshToken,
// 					roles: response.roles
// 				};
// 				console.log('userROLE',user.roles);
				
// 				return user;
// 			}
// 		})
// 	],

// 	callbacks: {
// 		async jwt({ token, user }) {
// 			console.log('user', user);
			
// 			if (user) {
// 				token.user = user; // Сохраняем данные пользователя в токен
// 				token.token = user.token; // Сохраняем access token в токен
// 				token.refreshToken = user.refreshToken; // Сохраняем refresh token в токен
// 				token.tokenExpires = Date.now() + 15 * 60 * 1000; // Устанавливаем время истечения access token (например, 15 минут)
// 			}

// 			// Проверяем, истёк ли access token
// 			if (Date.now() > (token.tokenExpires as number || 0)) {
// 				return await refreshAccessToken(token);
// 				return token; // Если токен ещё действителен, возвращаем его
// 			}

// 			// Если access token истёк, обновляем его с помощью refresh token
// 			return await refreshAccessToken(token);
// 		},
// 		async session({ session, token }) {
// 			console.log(token);
// 			session.token = token.token as string; // Добавляем access token в сессию
// 			session.refreshToken = token.refreshToken as string;
// 			session.user = token.user as AdapterUser & User; // Добавляем данные пользователя в сессию
// 			return session; // Возвращаем обновленную сессию
// 		},
//         // authorized({ auth, request: { nextUrl } }) {
// 		// 	const pathname = nextUrl.pathname;
// 		// 	const isOnDashboard =
// 		// 		pathname.startsWith('/home/game-signup') ||
// 		// 		pathname.startsWith('/home/') ||
// 		// 		pathname.startsWith('/home/profile');
// 		// 	const isLoggedIn = !!auth?.user;

// 		// 	if (isOnDashboard || pathname === '/') {
// 		// 		return isLoggedIn;
// 		// 	} else if (isLoggedIn) {
// 		// 		//const credentials = auth?.user;
// 		// 		//return Response.redirect(new URL(`/${credentials}`, nextUrl));
// 		// 	}

// 		// 	return true;
// 		// }
// 	}
// });

// // Функция для обновления access token с использованием refresh token
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // async function refreshAccessToken(token: any) {
// // 	try {
// // 		const refreshedTokens = await refreshTokenAPI(token.refreshToken); // Вызываем ваш метод обновления токена

// // 		return {
// // 			...token,
// // 			token: refreshedTokens.jwtToken,
// // 			refreshToken: refreshedTokens.refreshToken || token.refreshToken, // Обновляем refresh token только если он предоставлен API
// // 			tokenExpires: Date.now() + 30 * 60 * 1000 // Устанавливаем новое время истечения токена (например, 15 минут)
// // 		};
// // 	} catch (error) {
// // 		console.error('Ошибка при обновлении токена:', error);

// // 		return {
// // 			...token,
// // 			error: 'RefreshAccessTokenError'
// // 		};
// // 	}
// // }

// // Расширяем интерфейсы NextAuth.js для поддержки кастомных данных пользователя и токена
// declare module 'next-auth' {
// 	interface Session {
// 		token: string; // Access Token из сессии
// 		refreshToken: string; // Refresh Token из сессии
// 		user: User;
// 	}
// 	interface User {
// 		token: string; // Access Token от вашего API
// 		refreshToken: string; // Refresh Token от вашего API
// 		roles: string[];
// 	}
// 	interface JWT {
// 		user?: User;
// 		token?: string;
// 		refreshToken?: string;
// 		tokenExpires?: number;
// 		error?: string;
// 	}

// }
// auth.ts
import Credentials from 'next-auth/providers/credentials';
import { loginUser, refreshToken as refreshTokenAPI } from './lib/api/auth';
import NextAuth, { User as NextAuthUser } from 'next-auth';
import { z } from 'zod';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

// Расширяем стандартный User для добавления кастомных полей
interface User extends NextAuthUser {
  token: string;
  refreshToken: string;
  roles: string[];
}

// Расширяем JWT для хранения токенов и пользователя
interface Token extends JWT {
  token?: string; // accessToken
  refreshToken?: string;
  tokenExpires?: number;
  user?: User;
  error?: string;
  refreshing?: Promise<Token | undefined>; // Может быть undefined
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/home',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const response = await loginUser(parsed.data.email, parsed.data.password);

        if (!response?.jwtToken || !response?.refreshToken) return null;

        const user: User = {
          token: response.jwtToken,
          refreshToken: response.refreshToken,
          roles: response.roles,
          name: parsed.data.email,
          email: parsed.data.email,
        };

        return user;
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    // Если предоставлен пользователь (например, при входе),
    // обновляем токены и поля профиля
    if (user) {
      return {
        ...token,
        user,
        token: user.token,
        refreshToken: user.refreshToken,
        tokenExpires: Date.now() + 40 * 60 * 1000,
      };
    }

    // Если токен ещё действителен, ничего не делаем
    if (token.tokenExpires && Date.now() < token.tokenExpires) {
      return token;
    }

    // Проверяем наличие текущего процесса обновления токена
    if (token.refreshing) {
      try {
        const refreshedToken = await token.refreshing;
        return refreshedToken ?? token;
      } catch (err) {
        console.error("Ошибка ожидания обновления:", err);
        return token;
      }
    }

    // Инициализируем обновление токена
    token.refreshing = refreshTokenAPI(token.refreshToken!).then(
      (refreshedTokens) => ({
        ...token,
        token: refreshedTokens.jwtToken,
        refreshToken: refreshedTokens.refreshToken,
        tokenExpires: Date.now() + 40 * 60 * 1000,
        refreshing: undefined,
      }),
      (error) => {
        console.error("Ошибка обновления токена:", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
          refreshing: undefined,
        };
      }
    );

    // Возвращаем временный токен, пока обновление выполняется
    return token;
  },

  async session({ session, token }) {
    session.token = token.token as string;
    session.refreshToken = token.refreshToken as string;
    session.user = token.user as AdapterUser & User;
    session.error = token.error;
    return session;
	},
},
  secret: process.env.AUTH_SECRET,
});

// Расширяем типы NextAuth для поддержки кастомных полей
declare module 'next-auth' {
  interface Session {
    token: string;
    refreshToken: string;
    user: User;
    error?: string;
  }
  interface User {
    token: string;
    refreshToken: string;
    roles: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    refreshToken?: string;
    tokenExpires?: number;
    user?: User;
    error?: string;
    refreshing?: Promise<Token | undefined>; // Может быть undefined
  }
}
