import React from "react";
import styles from "./ShareModal.module.css";
import SvgClose from "../icons/Close";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postUrl: string;
};

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, postUrl }) => {
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch {
      console.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Поделиться этим постом</h3>
          <button className={styles.closeIcon} onClick={onClose} aria-label="Закрыть">
            <SvgClose />
          </button>
        </div>

        <label className={styles.label}>
          Ссылка
          <input className={styles.input} type="text" value={postUrl} readOnly />
        </label>

        <div className={styles.actions}>
          <button onClick={handleCopy} className={styles.copyBtn}>
            Скопировать ссылку
          </button>
        </div>
      </div>
    </div>
  );
};
