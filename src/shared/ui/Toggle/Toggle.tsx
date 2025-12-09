import { useEffect, useState } from "react";
import styles from "./Toggle.module.css";

export const Toggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`${styles.toggle} ${theme === "dark" ? styles.active : ""}`}
      onClick={toggleTheme}
    >
      <div className={styles.circle}></div>
    </div>
  );
};
