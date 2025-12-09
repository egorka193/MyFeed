import { type ReactNode, useState } from "react";
import {
  defaultDuration,
  type IToast,
  type ToastInput,
} from "@/features/toaster/types.ts";
import { ToasterContainer } from "@/features/toaster/ToasterContainer.tsx";
import { ToasterContext } from "./ToasterContext";

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = (toast: ToastInput): string => {
    const id = generateId();

    const newToast: IToast = {
      id,
      ...toast,
      duration: toast.duration || defaultDuration,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);

    return id;
  };

  const removeToast = (id: IToast["id"]) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  };

  const toastSuccess = (message: string, duration?: number) => {
    return addToast({
      message,
      type: "success",
      duration,
    });
  };

  const toastError = (message: string, duration?: number) => {
    return addToast({
      message,
      type: "error",
      duration,
    });
  };

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    toastSuccess,
    toastError,
  };

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <ToasterContainer />
    </ToasterContext.Provider>
  );
};
