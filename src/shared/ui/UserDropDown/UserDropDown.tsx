import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserDropdown.module.css";
import SvgDropDown from "@/shared/ui/icons/DropDown";
import SvgOpenDropDown from "@/shared/ui/icons/OpenDropDown";
import avatarImg from "@/shared/assets/icons/Avatar.svg";
import type { AuthState } from "@/features/auth/model/authSlice";

interface Props {
  user: AuthState["user"];
  onLogout?: () => void;
}

export const UserDropdown = ({ user, onLogout }: Props) => {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className={styles.userWrapper}>
      <div className={styles.userInfo}>
        <img
          src={user.avatarUrl || avatarImg}
          alt="avatar"
          className={styles.avatar}
        />
        <span className={styles.userName}>
          {user.firstName || user.lastName
            ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
            : user.email}
        </span>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={styles.dropdownToggle}
        >
          {open ? <SvgOpenDropDown /> : <SvgDropDown />}
        </button>
      </div>

      {open && (
        <div className={styles.dropdownMenu}>
          <NavLink
            to="/profile"
            className={`${styles.dropdownItem} ${styles.profileLink}`}
            onClick={() => setOpen(false)}
          >
            Мой профиль
          </NavLink>
          <button
            className={`${styles.dropdownItem} ${styles.logoutBtn}`}
            onClick={() => {
              onLogout?.();
              setOpen(false);
            }}
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
