import { useMemo, useState } from "react";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { StarAuth } from "@/shared/ui/icons";
import { LoginFormContent } from "../../features/auth/LoginFormContent/LoginFormContent";
import { RegistrationFormContent } from "../../features/auth/RegistrationFormContent/RegistrationFormContent";
import styles from "./authForm.module.css";

export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const tabs = useMemo(
    () => [
      { id: "login", label: "Авторизация" },
      { id: "register", label: "Регистрация" },
    ],
    []
  );

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__header}>
        <StarAuth />
        <h2>MyFeed</h2>
      </div>

      <Tabs
        tabs={tabs}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as "login" | "register")}
      />

      <div className={styles.authForm__content}>
        {activeTab === "login" ? <LoginFormContent /> : <RegistrationFormContent />}
      </div>
    </div>
  );
};
