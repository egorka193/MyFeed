import { Toast } from "@/features/toaster/Toast.tsx";
import { useToaster } from "./useToaster.ts";
import type { IToast } from "./types";

export const ToasterContainer = () => {
  const { toasts, removeToast } = useToaster();

  // Если нет уведомлений - ничего не рендерим
  if (toasts.length === 0) return null;

  return (
    <div className="toaster-container">
      {toasts.map((toast: IToast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
