import { forwardRef } from "react";
import styles from "./DateInput.module.css";
import SvgCalender from "@/shared/ui/icons/Calender";

interface DateInputProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onClick, placeholder, label, error }, ref) => {
    return (
      <div className={styles.dateInputWrapper}>
        {label && <label className={styles.dateInputLabel}>{label}</label>}

        <div style={{ position: "relative" }}>
          <input
            ref={ref}
            value={value}
            onClick={onClick}
            placeholder={placeholder}
            className={`${styles.dateInputField} ${error ? styles.dateInputError : ""}`}
            readOnly
          />
          <span className={styles.dateInputIcon} onClick={onClick}>
            <SvgCalender />
          </span>
        </div>

        {error && <p className={styles.dateInputErrorText}>{error}</p>}
      </div>
    );
  }
);
