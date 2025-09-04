import styles from "./ProfilePage.module.css";
import avatarImg from "@/shared/assets/icons/Avatar.svg";
import { Input } from "@/shared/ui/Input/Input";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEditProfile } from "@/features/editProfile/api/__generated__/editProfile";
import { useUserMe } from "@/shared/api/user/__generated__/userMe";
import { GenderType } from "@/shared/types/api-types";

const schema = yup.object({
  firstName: yup.string().default("").required("Введите имя"),
  lastName: yup.string().default("").required("Введите фамилию"),
  middleName: yup.string().default(""),
  birthDate: yup.string().default(""),
  gender: yup.string().default(""),
  email: yup.string().default("").email("Некорректный email").required("Введите email"),
  phone: yup.string().default(""),
  country: yup.string().default(""),
});


type ProfileFormValues = yup.InferType<typeof schema>;

export const ProfilePage = () => {
  const { data, loading } = useUserMe();
  const [editProfile] = useEditProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      birthDate: "",
      gender: "",
      email: "",
      phone: "",
      country: "",
    },
  });

  useEffect(() => {
    if (data?.userMe) {
      reset({
        firstName: data.userMe.firstName ?? "",
        lastName: data.userMe.lastName ?? "",
        middleName: data.userMe.middleName ?? "",
        birthDate: data.userMe.birthDate ?? "",
        gender: data.userMe.gender ?? "",
        email: data.userMe.email ?? "",
        phone: data.userMe.phone ?? "",
        country: data.userMe.country ?? "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await editProfile({
        variables: {
          input: {
            ...values,
            gender: values.gender ? (values.gender as GenderType) : undefined,
          },
        },
      });
      console.log("✅ Данные обновлены", values);
    } catch (error) {
      console.error("❌ Ошибка при сохранении профиля:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Мой профиль</h1>
      <img src={avatarImg} alt="Аватар" className={styles.avatar} />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Имя"
          placeholder="Введите имя"
          {...register("firstName")}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <Input
          type="text"
          label="Фамилия"
          placeholder="Введите фамилию"
          {...register("lastName")}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <Input
          type="text"
          label="Отчество"
          placeholder="Введите отчество"
          {...register("middleName")}
        />

        <Input
          type="date"
          label="Дата рождения"
          {...register("birthDate")}
        />

        <div className={styles.genderGroup}>
          <span className={styles.genderLabel}>Выберите пол:</span>
          <label className={styles.genderOption}>
            <input type="radio" value="male" {...register("gender")} />
            Мужской
          </label>
          <label className={styles.genderOption}>
            <input type="radio" value="female" {...register("gender")} />
            Женский
          </label>
        </div>

        <Input
          type="email"
          label="Email"
          placeholder="Введите email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <Input
          type="tel"
          label="Телефон"
          placeholder="Введите номер"
          {...register("phone")}
        />

        <Input
          type="text"
          label="Страна"
          placeholder="Введите страну"
          {...register("country")}
        />

        <div className={styles.buttons}>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            Сохранить
          </button>
          <button type="button" onClick={() => reset()} className={styles.cancelBtn}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};
