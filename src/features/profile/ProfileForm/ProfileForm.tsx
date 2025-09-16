import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { RadioGroup } from "@/shared/ui/Checkbox/RadioGroup";
import { DateInput } from "@/shared/ui/DateInput/DateInput";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { useEditProfile } from "@/features/editProfile/api/__generated__/editProfile";
import { useAppSelector, useAppDispatch } from "@/shared/store/store";
import { setUser } from "@/features/auth/model/authSlice";
import type { GenderType, EditProfileRequest } from "@/shared/types/api-types";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import styles from "../../../pages/ProfilePage/ProfilePage.module.css";
import { useEffect } from "react";

const schema = yup.object({
  firstName: yup.string().required("Введите имя"),
  lastName: yup.string().required("Введите фамилию"),
  middleName: yup.string().required("Введите отчество"),
  birthDate: yup.string().required("Введите дату рождения"),
  gender: yup.string().required("Выберите пол"),
  email: yup.string().email("Некорректный email").required("Введите email"),
  phone: yup.string().required("Введите телефон"),
  country: yup.string().required("Введите страну"),
});

type ProfileFormValues = yup.InferType<typeof schema>;

interface ProfileFormProps {
  onSaved?: () => void;
  onDirtyChange?: (dirty: boolean) => void; // коллбек для передачи флага в родителя
}

export const ProfileForm = ({ onSaved, onDirtyChange }: ProfileFormProps) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [editProfile, { loading: editLoading }] = useEditProfile();

  const { register, handleSubmit, control, formState: { errors, isDirty, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      middleName: user?.middleName ?? "",
      birthDate: user?.birthDate ?? "",
      gender: user?.gender ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      country: user?.country ?? "",
    }
  });

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const updateUserState = (updatedUser: Partial<typeof user>) => {
    if (!user) return;
    dispatch(setUser({ ...user, ...updatedUser }));
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const payload: EditProfileRequest = Object.fromEntries(
        Object.entries({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName,
          birthDate: values.birthDate,
          gender: values.gender as GenderType,
          phone: values.phone,
          country: values.country,
        }).filter(([_, v]) => v !== undefined && v !== "")
      ) as EditProfileRequest;

      const response = await editProfile({ variables: { input: payload } });
      const updated = response.data?.userEditProfile?.user;

      if (updated) {
        const newGender: GenderType | undefined =
          updated.gender === "MALE" || updated.gender === "FEMALE"
            ? (updated.gender as GenderType)
            : user?.gender;

        updateUserState({
          email: updated.email,
          firstName: updated.firstName ?? "",
          lastName: updated.lastName ?? "",
          middleName: updated.middleName ?? "",
          birthDate: updated.birthDate ?? user?.birthDate ?? "",
          gender: newGender,
          phone: updated.phone ?? user?.phone ?? "",
          country: updated.country ?? user?.country ?? "",
          avatarUrl: updated.avatarUrl ?? user?.avatarUrl ?? null,
        });
      }

      onSaved?.();
    } catch (err: any) {
      console.error("Ошибка сохранения профиля:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input {...register("firstName")} label="Имя" error={errors.firstName?.message} />
      <Input {...register("lastName")} label="Фамилия" error={errors.lastName?.message} />
      <Input {...register("middleName")} label="Отчество" error={errors.middleName?.message} />

      <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) =>
                  field.onChange(date?.toISOString().split("T")[0])
                }
                dateFormat="dd.MM.yyyy"
                customInput={
                  <DateInput
                    label="Дата рождения"
                    error={errors.birthDate?.message}
                  />
                }
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
            )}
          />

      <RadioGroup
        name="gender"
        label="Выберите пол"
        control={control}
        options={[
          { label: "Мужской", value: "MALE" },
          { label: "Женский", value: "FEMALE" },
        ]}
      />

      <Input {...register("email")} label="Email" error={errors.email?.message} />
      <Input {...register("phone")} label="Телефон" error={errors.phone?.message} placeholder="+7(999)-999-99-99"/>
      <Input {...register("country")} label="Страна" error={errors.country?.message} />

      <div className={styles.buttons}>
        <Button type="button" className={styles.cancelBtn} loading={editLoading || isSubmitting} disabled={editLoading || isSubmitting}>
          Отменить
        </Button>
        <Button type="submit" className={styles.saveBtn} loading={editLoading || isSubmitting} disabled={editLoading || isSubmitting || !isDirty}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
