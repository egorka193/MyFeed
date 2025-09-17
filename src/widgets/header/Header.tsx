import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import type { RootState } from "@/shared/store/store";
import { useDispatch, useSelector } from "react-redux";
import { StarAuth } from "@/shared/ui/icons";
import { Toggle } from "@/shared/ui/Toggle/Toggle";
import { UserDropdown } from "@/shared/ui/UserDropDown/UserDropDown";
import { clearCredentials } from "@/features/auth/model/authSlice";
import { useState } from "react";
import { Close } from "@/shared/ui/icons";
import { MenuIcon } from "@/shared/ui/icons/MenuIcon";

export const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  const pageTitleMap: Record<string, string> = {
    "/main": "Главная",
    "/my-posts": "Мои посты",
    "/favorites": "Избранное",
    "/profile": "Мой профиль",
  };
  const currentTitle = pageTitleMap[location.pathname] || "";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearCredentials());
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <Close /> : <MenuIcon />}
        </button>

        <span className={styles.mobilePageTitle}>{currentTitle}</span>

        <NavLink to="/" className={styles.logo}>
          <div className={styles.authForm__header}>
            <StarAuth />
            <h2>MyFeed</h2>
          </div>
        </NavLink>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ""}`}>
          <NavLink
            to="/main"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Главная
          </NavLink>
          <NavLink
            to="/my-posts"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Мои посты
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            onClick={() => setMobileMenuOpen(false)}
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

      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          <NavLink to="/main" onClick={() => setMobileMenuOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/my-posts" onClick={() => setMobileMenuOpen(false)}>
            Мои посты
          </NavLink>
          <NavLink to="/favorites" onClick={() => setMobileMenuOpen(false)}>
            Избранное
          </NavLink>
          {token && user ? (
            <button onClick={handleLogout}>Выйти</button>
          ) : (
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              Войти
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
};
