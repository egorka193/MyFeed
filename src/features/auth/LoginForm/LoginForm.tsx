import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { Eye, EyeSlash, Close, StarAuth } from "@/shared/ui/icons";
import './loginForm.css'

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || !password) {
      return;
    }
    console.log("Login:", { email, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <StarAuth />
        <h2>MyFeed</h2>
      </div>
      <Tabs
        tabs={[
          { label: "Авторизация", content: null },
          { label: "Регистрация", content: null },
        ]}
      />

      <p className="login-form__subtitle">
        Введите Ваш Email и пароль, чтобы войти в аккаунт
      </p>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        status={
          submitted ? (!email ? "error" : "success") : undefined
        }
        error={submitted && !email ? "Введите email" : ""}
      />

      <Input
        label="Пароль"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        status={
          submitted ? (!password ? "error" : "success") : undefined
        }
        error={submitted && !password ? "Введен неверный пароль" : ""}
        rightIcon={
          showPass ? (
            <EyeSlash width={18} height={18} onClick={() => setShowPass(false)} />
          ) : (
            <Eye width={18} height={18} onClick={() => setShowPass(true)} />
          )
        }
      />

      <Button type="submit" variant="primary" className="login-btn">
        Войти
      </Button>
    </form>
  );
};
