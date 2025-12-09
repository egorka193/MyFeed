import { Loader } from "@/shared/ui/icons";
import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ loading, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${className} ${loading ? styles.loading : ""}`}
      disabled={props.disabled || loading}
    >
      {loading && <Loader className={styles.spinner} />}
      <span className={loading ? styles.textHidden : ""}>{children}</span>
    </button>
  );
};

