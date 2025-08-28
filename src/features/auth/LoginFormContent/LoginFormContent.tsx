import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Eye, EyeSlash } from "@/shared/ui/icons";
import { useState } from "react";
import styles from "./loginFormContent.module.css";
import { useSignIn } from "./api/__generated__/login";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginFormContent = () => {
  const [showPass, setShowPass] = useState(false);
  const [signIn, { data, loading }] = useSignIn()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const result = await signIn({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const problem = result.data?.userSignIn.problem;

      if (problem) {
        if (problem.message.toLowerCase().includes("email")) {
          setError("email", { type: "manual", message: problem.message });
        } else if (problem.message.toLowerCase().includes("password")) {
          setError("password", { type: "manual", message: problem.message });
        }
        return;
      }

      if (result.data?.userSignIn.token) {
        console.log("Токен:", result.data.userSignIn.token);
        console.log("Пользователь:", result.data.userSignIn.user);

        navigate("/main", { replace: true });
      }

      if (result.data?.userSignIn.problem) {
        console.error("Ошибка авторизации:", result.data.userSignIn.problem.message);
      }
    } catch (err) {
      console.error("Ошибка мутации:", err);
    }
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
        status={data?.userSignIn?.problem?.message.toLowerCase().includes("email") ? "error" : 
                data?.userSignIn?.token ? "success" : undefined}
        error={errors.email?.message || (data?.userSignIn?.problem?.message.toLowerCase().includes("email") ? data.userSignIn.problem.message : undefined)}
      />

      <Input
        label="Пароль"
        type={showPass ? "text" : "password"}
        {...register("password", { required: "Введите пароль" })}
        status={
          errors.password || (data?.userSignIn?.problem?.message.toLowerCase().includes("password"))
            ? "error"
            : undefined
        }
        error={errors.password?.message || (data?.userSignIn?.problem?.message.toLowerCase().includes("password") ? data.userSignIn.problem.message : undefined)}
        rightIcon={
          showPass ? (
            <EyeSlash width={18} height={18} onClick={() => setShowPass(false)} />
          ) : (
            <Eye width={18} height={18} onClick={() => setShowPass(true)} />
          )
        }
      />

      <Button type="submit" variant="primary" className="login-btn" disabled={loading}>
        {loading ? "Входим..." : "Войти"}
      </Button> 
    </form>
  );
};
