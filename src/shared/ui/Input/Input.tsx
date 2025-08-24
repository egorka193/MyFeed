import { type InputHTMLAttributes, useId } from "react";
import "./Input.css";
import { Eye, EyeSlash, Close, StarAuth, Success } from "@/shared/ui/icons";

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
        <span className="ui-input-status-icon error">
          <Close width={12} height={12} />
        </span>
      );
    if (status === "success")
      return (
        <span className="ui-input-status-icon success">
          <Success width={12} height={12} />
        </span>
      );
    return null;
  })();

  return (
    <div className="ui-input-wrapper">
      {label && (
        <label className="ui-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={`ui-input-field ${error ? "ui-input-error" : ""}`}>
        <input id={inputId} className="ui-input" {...props} />
        
        {rightIcon ? (
          <span className={`ui-input-icon ${status === "error" ? "error" : ""}`}>
            {rightIcon}
          </span>
        ) : (
          statusIcon && <span className="ui-input-icon">{statusIcon}</span>
        )}
      </div>

      {error && <p className="ui-input-error-text">{error}</p>}
    </div>
  );
};
