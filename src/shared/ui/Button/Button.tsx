import { type ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`ui-button ui-button--${variant} ${className}`}
      {...props}
    />
  );
};
