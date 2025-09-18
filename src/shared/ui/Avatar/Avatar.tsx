import styles from "./Avatar.module.css";
import avatarImg from "@/shared/assets/icons/Avatar.svg";

type AvatarProps = {
  url?: string | null;
  size?: number;
  alt?: string;
};

export const Avatar = ({ url, size = 40, alt = "User" }: AvatarProps) => {
  const sizeStyles = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const validUrl = url && url.trim() !== "" ? url : avatarImg;

  return (
    <div className={styles.avatar} style={sizeStyles}>
      <img src={validUrl} alt={alt} />
    </div>
  );
};
