import { forwardRef, useState } from "react";
import { Input, type InputProps } from "@/shared/ui/Input/Input";

interface InputPasswordProps extends Omit<InputProps, "type"> {}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        showPasswordToggle
        isPasswordVisible={isPasswordVisible}
        onTogglePassword={() => setIsPasswordVisible(prev => !prev)}
      />
    );
  }
);

InputPassword.displayName = "InputPassword";
