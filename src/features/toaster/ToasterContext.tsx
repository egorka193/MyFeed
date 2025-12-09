import type { IToast, ToastInput } from "./types.ts";
import { createContext } from "react";

interface ToasterContextType {
  toasts: IToast[];
  addToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
  toastSuccess: (message: string, duration?: number) => string;
  toastError: (message: string, duration?: number) => string;
}

export const ToasterContext = createContext<ToasterContextType | undefined>(
  undefined,
);
