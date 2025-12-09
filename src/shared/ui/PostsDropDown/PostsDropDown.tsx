import { useState, useRef, useEffect } from "react";
import { PostFilterType } from "@/shared/types/api-types";
import styles from "./PostsDropDown.module.css";

interface PostsDropdownProps {
  value: PostFilterType;
  onChange: (value: PostFilterType) => void;
}

export const PostsDropdown = ({ value, onChange }: PostsDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (val: PostFilterType) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <button
        className={styles.dropdownTrigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value === PostFilterType.New ? "Новые" : "Топ"}
        <span className={styles.arrow} />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleSelect(PostFilterType.New)}
          >
            Новые
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleSelect(PostFilterType.Top)}
          >
            Топ
          </button>
        </div>
      )}
    </div>
  );
};
