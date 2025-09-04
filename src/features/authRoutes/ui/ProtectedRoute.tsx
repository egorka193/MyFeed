import { Navigate } from "react-router-dom";
import { useAppSelector, type RootState } from "@/shared/store/store";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = useAppSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

