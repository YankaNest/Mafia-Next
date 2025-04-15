"use client"
import { useActionState } from "react";
import styles from "./AuthForm.module.css";
import { authenticate } from "@/lib/api/auth";
 
export default function Login() {
    const [ errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);
  console.log(formAction);
  

  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <form action={formAction} className={styles.form}>
      <h1 className={styles.title}>Авторизация</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          required
          className={styles.input}
        />
        <button type="submit" disabled={isPending} className={styles.subButton}>
        Войти
        </button>
      </form>
      {errorMessage && <>Ошибка</>}
    </div>
  </div>
  )
}