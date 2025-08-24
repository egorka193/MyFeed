import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Eye, EyeSlash, StarAuth } from "@/shared/ui/icons";
import "./registerForm.css";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !password || !repeatPassword) {
      return;
    }
    if (password !== repeatPassword) {
      return;
    }

    console.log("Register:", { email, password });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__header">
        <StarAuth />
        <h2>MyFeed</h2>
      </div>

      <p className="register-form__subtitle">
        Введите Email и придумайте пароль для создания аккаунта
      </p>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        status={submitted ? (!email ? "error" : "success") : undefined}
        error={submitted && !email ? "Введите email" : ""}
      />

      <Input
        label="Придумайте пароль"
        type={showPass ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        status={submitted ? (!password ? "error" : "success") : undefined}
        error={submitted && !password ? "Введите пароль" : ""}
        rightIcon={
          showPass ? (
            <EyeSlash width={18} height={18} onClick={() => setShowPass(false)} />
          ) : (
            <Eye width={18} height={18} onClick={() => setShowPass(true)} />
          )
        }
      />

      <Input
        label="Повторите пароль"
        type={showRepeatPass ? "text" : "password"}
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        status={
          submitted
            ? !repeatPassword || repeatPassword !== password
              ? "error"
              : "success"
            : undefined
        }
        error={
          submitted && repeatPassword !== password
            ? "Пароли не совпадают"
            : submitted && !repeatPassword
            ? "Повторите пароль"
            : ""
        }
        rightIcon={
          showRepeatPass ? (
            <EyeSlash
              width={18}
              height={18}
              onClick={() => setShowRepeatPass(false)}
            />
          ) : (
            <Eye
              width={18}
              height={18}
              onClick={() => setShowRepeatPass(true)}
            />
          )
        }
      />

      <Button type="submit" variant="primary" className="register-btn">
        Зарегистрироваться
      </Button>
    </form>
  );
};
