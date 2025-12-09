import { AuthForm } from "@/widgets/AuthForm/AuthForm";
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  return (
    <div className={styles.loginForm__wrapper}>
      <AuthForm />
    </div>
  );
};
