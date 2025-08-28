import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Eye, EyeSlash } from "@/shared/ui/icons";
import { useState } from "react";
import styles from "./RegistrationFormContent.module.css";

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

  const {
    register,
    handleSubmit,
    watch,
    trigger,
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

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("Register:", data);
  };

  const handleNextStep = async () => {
    // валидируем только поля 1 шага
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
            {...register("repeatPassword", {
              required: "Повторите пароль",
              validate: (value) =>
                value === passwordValue || "Пароли не совпадают"
            })}
            status={
              isSubmitted ? (errors.repeatPassword ? "error" : "success") : undefined
            }
            error={errors.repeatPassword?.message}
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
