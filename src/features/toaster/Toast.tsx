import type { IToast } from "./types";
import { useEffect, useRef } from "react";
import { Close, Error, Success } from "@/shared/ui/icons";
import "./Toaster.css";

type ToasterProps = {
  toast: IToast;
  onClose: () => void;
};

export const Toast = ({ toast, onClose }: ToasterProps) => {
  const { message, type = "success", duration } = toast;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (duration) {
      timerRef.current = setTimeout(onClose, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, onClose]);

  return (
    <div className="toast">
      <div className="toast-icon">
        {type === "error" && <Error />}
        {type === "success" && <Success />}
      </div>
      <div className="toast-message">{message}</div>
      <button
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Закрыть"
      >
        <Close />
      </button>
    </div>
  );
};
