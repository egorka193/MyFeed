import { type InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
}

export const Input = ({ label, error, rightIcon, ...props }: InputProps) => {
  return (
    <div className="ui-input-wrapper">
      {label && <label className="ui-input-label">{label}</label>}

      <div className={`ui-input-field ${error ? "ui-input-error" : ""}`}>
        <input className="ui-input" {...props} />
        {rightIcon && <span className="ui-input-icon">{rightIcon}</span>}
      </div>

      {error && <p className="ui-input-error-text">{error}</p>}
    </div>
  );
};
