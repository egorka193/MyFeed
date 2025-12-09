import { useNavigate } from "react-router-dom";
import { BackArrow } from "@/shared/ui/icons";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  label?: string;
  confirm?: boolean;
  onConfirmExit?: () => void;
}

export const BackButton = ({
  label = "Главная",
  confirm = false,
  onConfirmExit,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (confirm && onConfirmExit) {
      onConfirmExit();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.backWrapper}>
      <button onClick={handleClick} className={styles.backButton}>
        <BackArrow width={24} height={24} style={{ color: "#BDBDBD" }} />
        <span>{label}</span>
      </button>
    </div>
  );
};
