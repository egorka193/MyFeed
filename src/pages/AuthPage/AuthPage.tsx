import { AuthForm } from "@/features/auth/AuthForm/AuthForm";
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  return (
    <div className={styles.loginForm__wrapper}>
      <AuthForm />
    </div>
  );
};
