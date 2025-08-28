import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Eye, EyeSlash } from "@/shared/ui/icons";
import { useState } from "react";
import styles from "./loginFormContent.module.css";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginFormContent = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.loginForm__subtitle}>
        Введите Ваш Email и пароль, чтобы войти в аккаунт
      </p>

      <Input
        label="Email"
        type="email"
        {...register("email", { required: "Введите email" })}
        status={isSubmitted ? (errors.email ? "error" : "success") : undefined}
        error={errors.email?.message}
      />

      <Input
        label="Пароль"
        type={showPass ? "text" : "password"}
        {...register("password", { required: "Введите пароль" })}
        status={isSubmitted ? (errors.password ? "error" : "success") : undefined}
        error={errors.password?.message}
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
