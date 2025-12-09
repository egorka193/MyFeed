import { useContext } from "react";
import { ToasterContext } from "@/features/toaster/ToasterContext.tsx";

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }

  return context;
};
