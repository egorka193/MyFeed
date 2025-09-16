import { AvatarDropdown } from "@/shared/ui/AvatarDropDown/AvatarDropDown";
import { fileApi } from "@/shared/api/axios/fileApi";
import { useEditProfile } from "@/features/editProfile/api/__generated__/editProfile";
import { useAppDispatch, useAppSelector } from "@/shared/store/store";
import { setUser } from "@/features/auth/model/authSlice";

interface ProfileAvatarProps {
  onAvatarChange?: () => void;
}

export const ProfileAvatar = ({ onAvatarChange }: ProfileAvatarProps) => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [editProfile] = useEditProfile();

  const updateUserState = (updatedUser: Partial<typeof user> | null) => {
    if (!updatedUser || !user) return;
    dispatch(setUser({ ...user, ...updatedUser }));
  };

  const handleUploadAvatar = async (file: File) => {
    try {
      const { data: link } = await fileApi.getUploadLink(file.name, "AVATARS");
      await fileApi.uploadImage(link, file);
      const avatarUrl = link.split("?")[0];

      await editProfile({
        variables: { input: { email: user?.email ?? "", avatarUrl } },
      });

      updateUserState({ avatarUrl });
      onAvatarChange?.();
    } catch (err) {
      console.error("Ошибка загрузки аватара:", err);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await editProfile({ variables: { input: { email: user?.email ?? "", avatarUrl: null } } });
      updateUserState({ avatarUrl: null });
      onAvatarChange?.();
    } catch (err) {
      console.error("Ошибка удаления аватара:", err);
    }
  };

  return <AvatarDropdown avatarSrc={user?.avatarUrl ?? null} onUpload={handleUploadAvatar} onDelete={handleDeleteAvatar} />;
};
