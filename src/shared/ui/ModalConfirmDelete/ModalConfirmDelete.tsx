import styles from "./ModalConfirmDelete.module.css";
import SvgClose from "@/shared/ui/icons/Close";

interface ModalConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const ModalConfirmDelete = ({ open, onClose, onDelete }: ModalConfirmDeleteProps) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <SvgClose />
        </button>
        <h3 className={styles.title}>Удалить эту запись?</h3>
        <p className={styles.text}>После удаления запись нельзя будет восстановить.</p>
        <div className={styles.actions}>
          <button className={styles.discardBtn} onClick={onClose}>
            Отменить
          </button>
          <button className={styles.saveBtn} onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
