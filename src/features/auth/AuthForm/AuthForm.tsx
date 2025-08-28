import { useState } from "react";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { StarAuth } from "@/shared/ui/icons";
import { LoginFormContent } from "../LoginFormContent/LoginFormContent";
import { RegistrationFormContent } from "../RegistrationFormContent/RegistrationFormContent";
import styles from "./authForm.module.css";

export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className={styles.authForm}>
      <div className={styles.authForm__header}>
        <StarAuth />
        <h2>MyFeed</h2>
      </div>

      <Tabs
        tabs={[
          { id: "login", label: "Авторизация" },
          { id: "register", label: "Регистрация" },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      <div className={styles.authForm__content}>
        {activeTab === "login" ? <LoginFormContent /> : <RegistrationFormContent />}
      </div>
    </div>
  );
};
