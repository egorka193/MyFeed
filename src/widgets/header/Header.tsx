import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import type { RootState } from "@/shared/store/store";
import { useDispatch, useSelector } from "react-redux";
import { StarAuth } from "@/shared/ui/icons";
import { Toggle } from "@/shared/ui/Toggle/Toggle";
import { UserDropdown } from "@/shared/ui/UserDropDown/UserDropDown";
import { clearCredentials } from "@/features/auth/model/authSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearCredentials());
  };


  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <NavLink to="/" className={styles.logo}>
          <div className={styles.authForm__header}>
            <StarAuth />
            <h2>MyFeed</h2>
          </div>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Мои посты
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Избранное
          </NavLink>
        </nav>

        <div className={styles.rightBlock}>
          <div className={styles.actions}>
            <Toggle />
          </div>
          {token && user ? (
            <UserDropdown user={user} onLogout={handleLogout} />
          ) : (
            <NavLink to="/login" className={styles.loginLink}>
              Войти
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
