import styles from "./ProfilePage.module.css";
import { Input } from "@/shared/ui/Input/Input";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useEditProfile } from "@/features/editProfile/api/__generated__/editProfile";
import { useUserMe } from "@/shared/api/user/__generated__/userMe";
import { GenderType, type EditProfileRequest } from "@/shared/types/api-types";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@/shared/ui/Checkbox/RadioGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateInput } from "@/shared/ui/DateInput/DateInput";
import { AvatarDropdown } from "@/shared/ui/AvatarDropDown/AvatarDropDown";
import { ModalConfirmExit } from "@/shared/ui/ModalConfirmExit/ModalConfirmExit";
import "./datePicker.css";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { Button } from "@/shared/ui/Button/Button";
import { fileApi } from "@/shared/api/axios/fileApi";
import { setUser } from "@/features/auth/model/authSlice";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";



const schema = yup.object({
  firstName: yup.string().default("").required("Введите имя"),
  lastName: yup.string().default("").required("Введите фамилию"),
  middleName: yup.string().default("").required("Выберите отчество"),
  birthDate: yup.string().default("").required("Введите дату рождения"),
  gender: yup.string().default("").required("Выберите пол"),
  email: yup.string().default("").email("Некорректный email").required("Введите email"),
  phone: yup.string().default("").required("Введите телефон"),
  country: yup.string().default("").required("Введите страну"),
});


type ProfileFormValues = yup.InferType<typeof schema>;

export const ProfilePage = () => {
  const { data } = useUserMe();
  const [editProfile, { loading: editLoading }] = useEditProfile();
  const navigate = useNavigate();
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleUploadAvatar = async (file: File) => {
    try {
      const responseLink = await fileApi.getUploadLink(file.name, "AVATARS");
      const link = responseLink.data;
  
      await fileApi.uploadImage(link, file);
  
      const avatarUrl = link.split("?")[0];
  
      await editProfile({ variables: { input: { email: data?.userMe?.email ?? "", avatarUrl } } });
  
      dispatch(setUser({ ...data?.userMe, avatarUrl, email: data?.userMe?.email ?? "", }));
  
      console.log("Аватар обновлён:", avatarUrl);
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      const response = await editProfile({
        variables: {
          input: {
            email: data?.userMe?.email ?? "",
            avatarUrl: null,
          },
        },
      });
  
      const updated = response.data?.userEditProfile?.user;
  
      if (updated) {
        dispatch(setUser(updated)); 
      }
  
      console.log("Аватар удалён", updated?.avatarUrl);
    } catch (error) {
      console.error("Ошибка удаления аватара:", error);
    }
  };
  
  


  const handleDiscard = () => {
    setExitModalOpen(false);
    navigate(-1); 
  };
  
  const handleSaveAndExit = async () => {
    await handleSubmit(onSubmit)(); 
    setExitModalOpen(false);
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
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
      const payload: EditProfileRequest = {
        email: values.email, 
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        middleName: values.middleName || undefined,
        birthDate: values.birthDate || undefined,
        gender: values.gender ? (values.gender as GenderType) : undefined,
        phone: values.phone || undefined,
        country: values.country || undefined,
      };
  
      Object.keys(payload).forEach(
        key => payload[key as keyof EditProfileRequest] === undefined && delete payload[key as keyof EditProfileRequest]
      );
  
      console.log("Отправляем на сервер:", payload);
  
      const response = await editProfile({ variables: { input: payload } });

      const updated = response.data?.userEditProfile?.user;

      if (updated) {
        const updatedUser = {
          email: updated.email,
          firstName: updated.firstName,
          lastName: updated.lastName,
          middleName: updated.middleName,
          avatarUrl: updated.avatarUrl ?? data?.userMe?.avatarUrl ?? null,
        };

        dispatch(setUser(updatedUser));
        console.log("Данные обновлены и записаны в Redux:", updatedUser);
      }
  
      console.log("Данные обновлены", payload);
    } catch (error: any) {
      console.error("ApolloError:", error);

    if (error.graphQLErrors?.length) {
      error.graphQLErrors.forEach((e: any, idx: number) => {
        console.error(`GraphQL Error ${idx}:`, e.message, e.extensions, e.path);
      });
    }

    if (error.networkError) {
      console.error("Network Error:", error.networkError);
    }

    console.error("Error message:", error.message);
      }
  };
  

  return (
    <>
      <BackButton
        label="Главная"
        confirm={isDirty}
        onConfirmExit={() => setExitModalOpen(true)}
      />
      
      <PageContainer>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>Мой профиль</h2>
        <AvatarDropdown
          avatarSrc={user?.avatarUrl ?? null}
          onUpload={handleUploadAvatar}
          onDelete={handleDeleteAvatar}
        />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="Имя"
            placeholder="Введите имя"
            {...register("firstName")}
            error={errors.firstName?.message}
            status={errors.firstName ? "error" : undefined}
          />

          <Input
            type="text"
            label="Фамилия"
            placeholder="Введите фамилию"
            {...register("lastName")}
            error={errors.lastName?.message}
            status={errors.lastName ? "error" : undefined}
          />

          <Input
            type="text"
            label="Отчество"
            placeholder="Введите отчество"
            {...register("middleName")}
            error={errors.middleName?.message}
            status={errors.middleName ? "error" : undefined}
          />

          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString().split("T")[0])}
                popperPlacement="top-end"
                showPopperArrow={false}
                locale="en"
                dateFormat="dd.MM.yyyy"
                formatWeekDay={(dayName) => dayName.slice(0, 3)}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  decreaseYear,
                  increaseYear,
                }) => (
                  <div className="custom-datepicker-header">
                    <div className="custom-datepicker-header__select">
                      <button className="custom-datepicker-header__select-arrow" onClick={decreaseMonth}>
                        <ArrowLeft />
                      </button>
                      <span className="custom-datepicker-header__select-label">{date.toLocaleString("en-EN", { month: "long" })}</span>
                      <button className="custom-datepicker-header__select-arrow" onClick={increaseMonth}>
                        <ArrowRight />
                      </button>
                    </div>

                    <div className="custom-datepicker-header__select">
                      <button className="custom-datepicker-header__select-arrow" onClick={decreaseYear}>
                        <ArrowLeft />
                      </button>
                      <span className="custom-datepicker-header__select-label">{date.getFullYear()}</span>
                      <button className="custom-datepicker-header__select-arrow" onClick={increaseYear}>
                        <ArrowRight />
                      </button>
                    </div>
                  </div>
                )}
                customInput={<DateInput label="Дата рождения" error={errors.birthDate?.message} />}
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


          <Input
            type="email"
            label="Email"
            placeholder="Введите email"
            {...register("email")}
            error={errors.email?.message}
            status={errors.email ? "error" : undefined}
          />

          <Input
            type="tel"
            label="Телефон"
            placeholder="+7(999)-999-99-99"
            {...register("phone")}
            error={errors.phone?.message}
            status={errors.phone ? "error" : undefined}
          />

          <Input
            type="text"
            label="Страна"
            placeholder="Введите страну"
            {...register("country")}
            error={errors.country?.message}
            status={errors.country ? "error" : undefined}
          />

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => reset()}
              className={styles.cancelBtn}
            >
              Отменить
            </button>

            <Button
              type="submit"
              variant="primary"
              className={styles.saveBtn}
              loading={editLoading || isSubmitting}
              disabled={!isDirty || editLoading || isSubmitting}
            >
              Сохранить
            </Button>
          </div>

          <ModalConfirmExit
            open={exitModalOpen}
            onClose={() => setExitModalOpen(false)}
            onDiscard={handleDiscard}
            onSave={handleSaveAndExit}
          />
        </form>
      </div>
      </PageContainer>
    </>
  );
};
