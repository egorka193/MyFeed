import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./loginFormContent.module.css";
import { useSignIn } from "./api/__generated__/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../model/authSlice";
import { useUserMeLazyQuery } from "@/shared/api/user/__generated__/userMe";
import { InputPassword } from "@/shared/ui/InputPassword/InputPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenderType } from "@/shared/types/api-types";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Некорректный формат email")
    .required("Введите email"),
  password: yup
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .required("Введите пароль"),
});


type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginFormContent = () => {
  const [signIn, { data, loading }] = useSignIn();
  const [fetchUserMe] = useUserMeLazyQuery(); 
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
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

      const token = result.data?.userSignIn.token ?? "";

      if (token) {

        dispatch(setToken(token));

        try {
          const meResult = await fetchUserMe();
          if (meResult.data?.userMe) {
            const user = meResult.data.userMe;
            dispatch(setUser({
              ...user,
              firstName: user.firstName ?? "",
              lastName: user.lastName ?? "",
              middleName: user.middleName ?? "",
              birthDate: user.birthDate ?? "",
              gender: (user.gender === "MALE" || user.gender === "FEMALE") 
              ? (user.gender as GenderType) 
              : undefined,
              phone: user.phone ?? "",
              country: user.country ?? "",
              avatarUrl: user.avatarUrl ?? null,
            }));
          }
        } catch (err) {
          console.error("Ошибка при загрузке userMe:", err);
        }

        navigate("/main");
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
        {...register("email")} 
        status={errors.email ? "error" : data?.userSignIn?.token ? "success" : undefined}
        error={errors.email?.message}
        disabled={loading}
      />

      <InputPassword
        label="Пароль"
        {...register("password")} 
        status={errors.password ? "error" : undefined}
        error={errors.password?.message}
        disabled={loading}
      />

      {errors.root && (
        <div className={styles.loginForm__error}>
          {errors.root.message}
        </div>
      )}

      <Button 
        type="submit" 
        variant="primary" 
        className={styles.loginForm__button}
        loading={loading}
        disabled={loading}
      >
        Войти
      </Button> 
    </form>
  );
};
