import { LoginForm } from "@/features/auth/LoginForm/LoginForm";

export const AuthPage = () => {
  return (
    <div className="loginForm__wrapper" style={{ padding: "2rem", display: "flex", justifyContent: 'center' }}>
      <LoginForm />
    </div>
  );
};