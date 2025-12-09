import { useState, useRef, useEffect } from "react";
import SvgEditSmall from "@/shared/ui/icons/EditSmall";
import styles from "./AvatarDropdown.module.css";
import avatarImg from "@/shared/assets/icons/Avatar.svg";

interface AvatarDropdownProps {
  avatarSrc: string | null;
  onUpload: (file: File) => void;
  onDelete: () => void;
}

export const AvatarDropdown = ({
  avatarSrc,
  onUpload,
  onDelete,
}: AvatarDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className={styles.avatarWrapper} ref={dropdownRef}>
      <img
        src={avatarSrc ?? avatarImg}
        alt="Аватар"
        className={styles.avatar}
      />
      <span
        className={styles.avatarEditIcon}
        onClick={() => setOpen((prev) => !prev)}
      >
        <SvgEditSmall width={36} height={36} style={{ color: "#EE683E" }} />
      </span>

      {open && (
        <div className={styles.avatarDropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              fileInputRef.current?.click();
              setOpen(false);
            }}
          >
            Загрузить фото
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Удалить фото
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
