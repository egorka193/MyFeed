import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";
import styles from "./RegistrationFormContent.module.css";
import { useSignUp } from "./api/__generated__/registration"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/features/auth/model/authSlice";
import { useEditProfile } from "@/features/editProfile/api/__generated__/editProfile";
import { useUserMeLazyQuery } from "@/shared/api/user/__generated__/userMe";
import type { GenderType } from "@/shared/types/api-types";

type Step1Values = {
  email: string;
  password: string;
  repeatPassword: string;
};

type Step2Values = {
  firstName: string;
  lastName: string;
  middleName: string;
};

type RegistrationFormValues = Step1Values & Step2Values;

export const RegistrationFormContent = () => {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const [step, setStep] = useState(1);

  const [signUp] = useSignUp();
  const [editProfile] = useEditProfile();
  const [fetchUserMe] = useUserMeLazyQuery();;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors, isSubmitted }
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      middleName: ""
    }
  });

  const passwordValue = watch("password");

  const onSubmit = async (formData: RegistrationFormValues) => {
    try {
      const result = await signUp({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.repeatPassword,
          },
        },
      });
  
      const token = result.data?.userSignUp.token ?? "";
  
      if (token) {
        dispatch(setToken(token));
  
        await editProfile({
          variables: {
            input: {
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              middleName: formData.middleName,
            },
          },
        });
  
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
  
        navigate("/main");
      } else if (result.data?.userSignUp.problem) {
        setError("email", {
          type: "server",
          message: result.data.userSignUp.problem.message,
        });
      }
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
  };
  

  const handleNextStep = async () => {
    const isValid = await trigger(["email", "password", "repeatPassword"]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.registrationForm__title}>
        {step === 1 ? "Шаг 1 из 2" : "Шаг 2 из 2"}
      </h2>

      {step === 1 && (
        <>
          <p className={styles.registrationForm__subtitle}>
            Чтобы создать аккаунт введите Ваш Email и придумайте пароль.
          </p>

          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Введите email" })}
            status={isSubmitted ? (errors.email ? "error" : "success") : undefined}
            error={errors.email?.message}
          />

          <Input
            label="Придумайте пароль"
            type={showPass ? "text" : "password"}
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" }
            })}
            status={isSubmitted ? (errors.password ? "error" : "success") : undefined}
            error={errors.password?.message}
          />

          <Input
            label="Повторите пароль"
            type={showRepeatPass ? "text" : "password"}
            {...register("repeatPassword", {
              required: "Повторите пароль",
              validate: (value) =>
                value === passwordValue || "Пароли не совпадают"
            })}
            status={
              isSubmitted ? (errors.repeatPassword ? "error" : "success") : undefined
            }
            error={errors.repeatPassword?.message}
          />

          <Button type="button" variant="primary" onClick={handleNextStep}>
            Далее
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <p className={styles.registrationForm__subtitle}>
            Дополнительно введите ваши личные данные.
          </p>

          <Input
            label="Имя"
            {...register("firstName", { required: "Введите имя" })}
            status={isSubmitted ? (errors.firstName ? "error" : "success") : undefined}
            error={errors.firstName?.message}
          />

          <Input
            label="Фамилия"
            {...register("lastName", { required: "Введите фамилию" })}
            status={isSubmitted ? (errors.lastName ? "error" : "success") : undefined}
            error={errors.lastName?.message}
          />

          <Input
            label="Отчество"
            {...register("middleName")}
          />

          <Button type="submit" variant="primary">
            Создать аккаунт
          </Button>
        </>
      )}
    </form>
  );
};
