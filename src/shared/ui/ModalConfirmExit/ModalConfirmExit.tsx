import styles from "./ModalConfirmExit.module.css";
import SvgClose from "@/shared/ui/icons/Close";

interface ModalConfirmExitProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

export const ModalConfirmExit = ({ open, onClose, onSave, onDiscard }: ModalConfirmExitProps) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <SvgClose />
        </button>
        <h3 className={styles.title}>Выйти без сохранения изменений?</h3>
        <p className={styles.text}>Внесённые изменения не будут сохранены.</p>
        <div className={styles.actions}>
          <button className={styles.discardBtn} onClick={onDiscard}>
            Не сохранять
          </button>
          <button className={styles.saveBtn} onClick={onSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
