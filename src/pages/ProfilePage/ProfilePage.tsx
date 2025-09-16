import styles from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import { useUserMe } from "@/shared/api/user/__generated__/userMe";
import { useAppSelector, useAppDispatch } from "@/shared/store/store";
import { setUser } from "@/features/auth/model/authSlice";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { BackButton } from "@/shared/ui/BackButton/BackButton";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { ProfileForm } from "@/features/profile/ProfileForm/ProfileForm";
import { ProfileAvatar } from "@/features/profile/ProfileAvatar";
import { GenderType } from "@/shared/types/api-types";

export const ProfilePage = () => {
  const { data, loading } = useUserMe(); 
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [formDirty, setFormDirty] = useState(false);
  const parseGender = (gender: string | undefined): GenderType | undefined => {
    if (gender === "MALE") return GenderType.Male;
    if (gender === "FEMALE") return GenderType.Female;
    return undefined;
  };

  useEffect(() => {
    if (!loading && data?.userMe) {
      dispatch(setUser({
        id: data.userMe.id,
        email: data.userMe.email ?? "",
        firstName: data.userMe.firstName ?? "",
        lastName: data.userMe.lastName ?? "",
        middleName: data.userMe.middleName ?? "",
        avatarUrl: data.userMe.avatarUrl ?? null,
        birthDate: data.userMe.birthDate ?? "",
       gender: parseGender(data.userMe.gender ?? undefined),
        phone: data.userMe.phone ?? "",
        country: data.userMe.country ?? "",
      }));
    }
  }, [data, loading, dispatch]);

  if (loading || !user) return <PageContainer>Загрузка...</PageContainer>; // Ждем данных

  return (
    <>
      <BackButton
        label="Главная"
        confirm={formDirty || avatarChanged}
        onConfirmExit={() => setExitModalOpen(true)}
      />

      <PageContainer>
        <div className={styles.profileCard}>
          <h2 className={styles.profileTitle}>Мой профиль</h2>

          <ProfileAvatar onAvatarChange={() => setAvatarChanged(true)} />

          <ProfileForm 
            onSaved={() => { setFormDirty(false); setAvatarChanged(false); }}
            onDirtyChange={setFormDirty} 
          />

          <ConfirmModal
            open={exitModalOpen}
            onClose={() => setExitModalOpen(false)}
            title="Выйти без сохранения изменений?"
            message="Внесённые изменения не будут сохранены."
            primaryAction={{
              label: "Сохранить",
              onClick: () => setExitModalOpen(false),
              variant: "primary",
              disabled: !(formDirty || avatarChanged),
            }}
            secondaryAction={{
              label: "Не сохранять",
              onClick: () => setExitModalOpen(false),
              variant: "secondary",
            }}
          />
        </div>
      </PageContainer>
    </>
  );
};

