import { type InputHTMLAttributes, useId } from "react";
import styles from "./Input.module.css";
import { Close, Success } from "@/shared/ui/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  id?: string; 
  status?: "error" | "success";
}

export const Input = ({ label, error, rightIcon, id, status, ...props }: InputProps) => {
  const generatedId = useId(); 
  const inputId = id ?? generatedId;

  const statusIcon = (() => {
    if (status === "error")
      return (
        <span className={`${styles.uiInput__status__icon} ${styles.error}`}>
          <Close width={12} height={12} />
        </span>
      );
    if (status === "success")
      return (
        <span className={`${styles.uiInput__status__icon} ${styles.success}`}>
          <Success width={12} height={12} />
        </span>
      );
    return null;
  })();

  return (
    <div className={styles.uiInput__wrapper}>
      {label && (
        <label className={styles.uiInput__label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={`${styles.uiInput__field} ${error ? styles["uiInput-error"] : ""}`}>
        <input id={inputId} className={styles.uiInput} {...props} />
        
        {rightIcon ? (
          <span className={`${styles.uiInput__icon} ${status === "error" ? styles.error : ""}`}>
            {rightIcon}
          </span>
        ) : (
          statusIcon && <span className={styles.uiInput__icon}>{statusIcon}</span>
        )}
      </div>

      {error && <p className={styles.uiInput__error__text}>{error}</p>}
    </div>
  );
};
