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

interface AuthFormProps {
  type: "register" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  // const [ProfileImage, setProfileImage] = useState<'' | string>('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "register") {
        // Регистрация пользователя
        const data = await registerUser(FirstName, LastName, Email, Password, PhoneNumber);{/**/}
        console.log("Пользователь зарегистрирован:", data);
        alert("Регистрация успешна!");
      } else if (type === "login") {
        // Авторизация пользователя
        const data = await loginUser(Email, Password);
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
            <h1>Регистрация</h1>
              <input
                type="text"
                placeholder="Имя"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Фамилия"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="phone"
                placeholder="Номер телефона"
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className={styles.input}
              />
              {/* <input
                type="file"
                placeholder="URL изображения профиля"
                value={ProfileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                required
                className={styles.input}
              /> */}
            </>
          )}
          <h1>Авторизация</h1>
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={Password}
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