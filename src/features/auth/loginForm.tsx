import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { Eye, EyeSlash, Close } from "@/shared/ui/icons";
import './loginForm.css'

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>MyFeed</h2>
      <Tabs
        tabs={[
          { label: "Авторизация", content: null },
          { label: "Регистрация", content: null },
        ]}
      />

      <p className="login-subtitle">
        Введите Ваш Email и пароль, чтобы войти в аккаунт
      </p>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!email ? "Почта не найдена" : ""}
        rightIcon={<Close size={18} onClick={() => setEmail("")} />}
      />

      <Input
        label="Пароль"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!password ? "Введен неверный пароль" : ""}
        rightIcon={
          showPass ? (
            <EyeSlash size={18} error={!password} onClick={() => setShowPass(false)} />
          ) : (
            <Eye size={18} error={!password} onClick={() => setShowPass(true)} />
          )
        }
      />

      <Button type="submit" variant="primary" className="login-btn">
        Войти
      </Button>
    </form>
  );
};
