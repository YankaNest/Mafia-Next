import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { registerUser } from "@/lib/api/auth";


const RegisterForm = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        // Регистрация пользователя
        const data = await registerUser(FirstName, LastName, Email, Password, PhoneNumber);{/**/}
        console.log("Пользователь зарегистрирован:", data);
        alert("Регистрация успешна!");
      } catch (error) {
      console.error("Ошибка:", error);
      setErrorMessage("Произошла ошибка. Проверьте введенные данные.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Регистрация</h1>
            <>
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
        </>
          <button type="submit" className={styles.subButton}>
            Зарегистрироваться
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;