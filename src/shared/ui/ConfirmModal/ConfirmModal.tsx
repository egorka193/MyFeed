import { type ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ConfirmModal.module.css";
import SvgClose from "../icons/Close";

type ActionButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
  children?: ReactNode;
  variant?: "center" | "bottom"; // можно указать вручную, иначе авто
}

export const ConfirmModal = ({
  open,
  onClose,
  title,
  message,
  primaryAction,
  secondaryAction,
  children,
  variant,
}: ConfirmModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  if (!open) return null;

  const modalVariant = variant ?? (isMobile ? "bottom" : "center");

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${
          modalVariant === "bottom" ? styles.bottom : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <SvgClose />
        </button>

        <h3 className={styles.title}>{title}</h3>
        {message && <p className={styles.text}>{message}</p>}

        {children}

        <div className={styles.actions}>
          {secondaryAction && (
            <button
              className={`${styles.actionBtn} ${styles.secondary}`}
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              className={`${styles.actionBtn} ${styles.primary}`}
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
