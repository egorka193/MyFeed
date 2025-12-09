import { type ReactNode, useEffect } from "react";
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
}

export const ConfirmModal = ({
  open,
  onClose,
  title,
  message,
  primaryAction,
  secondaryAction,
  children,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (!open) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              className={`${styles.actionBtn} ${styles.primary}`}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
