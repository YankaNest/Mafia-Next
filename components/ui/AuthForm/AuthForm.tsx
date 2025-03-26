// // components/AuthForm.tsx
// import React from "react";

// interface AuthFormProps {
//   type: "register" | "login";
// }

// const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Логика отправки данных
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" required />
//       <input type="password" placeholder="Password" required />
//       <button type="submit">{type === "register" ? "Зарегистрироваться" : "Войти"}</button>
//     </form>
//   );
// };

// export default AuthForm;



// import React from "react";
// import styles from "./AuthForm.module.css";
// import Button from "../Button/Button";

// interface AuthFormProps {
//   type: "register" | "login";
// }

// const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <div className={styles.background}>
//       <div className={styles.container}>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {type === "register" && (
//             <>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Имя"
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Номер телефона"
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Пароль"
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Повторите пароль"
//                 required
//                 className={styles.input}
//               />
//             </>
//           )}
//           {type === "login" && (
//             <>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className={styles.input}
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Пароль"
//                 required
//                 className={styles.input}
//               />
//             </>
//           )}
//           <Button type="submit">
//             {type === "register" ? "Зарегистрироваться" : "Войти"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { loginUser, registerUser } from "@/lib/api/auth";
// import { registerUser, loginUser } from "../mafia-app\lib\api\auth.ts"; // Импорт функций API

interface AuthFormProps {
  type: "register" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "register") {
        // Регистрация пользователя
        const data = await registerUser(firstName, lastName, email, password, profileImage);
        console.log("Пользователь зарегистрирован:", data);
        alert("Регистрация успешна!");
      } else if (type === "login") {
        // Авторизация пользователя
        const data = await loginUser(email, password);
        console.log("Авторизация успешна:", data);
        localStorage.setItem("access_token", data.jwtToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        alert("Авторизация успешна!");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setErrorMessage("Произошла ошибка. Проверьте введенные данные.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {type === "register" && (
            <>
              <input
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="URL изображения профиля"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                required
                className={styles.input}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {type === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

