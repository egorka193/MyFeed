import { type InputHTMLAttributes, useId, forwardRef } from "react";
import styles from "./Input.module.css";
import { Close, Success, Eye, EyeSlash } from "@/shared/ui/icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
  status?: "error" | "success";
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, id, status, showPasswordToggle, isPasswordVisible, onTogglePassword, suffix, ...props },
    ref
  ) => {
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
          <input
            ref={ref}
            id={inputId}
            className={styles.uiInput}
            type={showPasswordToggle ? (isPasswordVisible ? "text" : "password") : props.type}
            {...props}
          />

          {showPasswordToggle ? (
            <button
              type="button"
              className={`${styles.uiInput__icon} ${status === "error" ? styles.error : ""}`}
              onClick={onTogglePassword}
              disabled={props.disabled}
            >
              {isPasswordVisible ? <EyeSlash /> : <Eye />}
            </button>
          ) : (
            <>
              {suffix && <span className={styles.uiInput__icon}>{suffix}</span>}
              {statusIcon && <span className={styles.uiInput__icon}>{statusIcon}</span>}
            </>
          )}
        </div>

        {error && <p className={styles.uiInput__error__text}>{error}</p>}
      </div>
    );
  }
);

