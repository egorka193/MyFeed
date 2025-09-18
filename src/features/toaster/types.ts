type ToastType = "success" | "error";

export interface IToast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

export type ToastInput = Omit<IToast, "id" | "duration"> & {
  duration?: number;
};

export const defaultDuration = 5000;
