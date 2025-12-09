/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, type Control } from "react-hook-form";
import styles from "./RadioGroup.module.css";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: Option[];
  control: Control<any>;
}

export const RadioGroup = ({
  name,
  label,
  options,
  control,
}: RadioGroupProps) => {
  return (
    <div className={styles.group}>
      {label && <span className={styles.label}>{label}</span>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={styles.options}>
            {options.map((opt) => (
              <label key={opt.value} className={styles.option}>
                <input
                  type="radio"
                  value={opt.value}
                  checked={field.value === opt.value}
                  onChange={() => field.onChange(opt.value)}
                />
                <span className={styles.customRadio} />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};
