import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { Input } from "@/shared/ui/Input/Input";
import { type FC, useState } from "react";

interface SharePostModalProps {
  open: boolean;
  onClose: () => void;
  postUrl: string;
}

export const SharePostModal: FC<SharePostModalProps> = ({ open, onClose, postUrl }) => {
  const [url, setUrl] = useState(postUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // можно добавить уведомление "Скопировано"
    } catch {
      console.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title="Поделиться этим постом"
      primaryAction={{ label: "Скопировать ссылку", onClick: handleCopy, variant: "primary" }}
    >
      <Input value={url} readOnly />
    </ConfirmModal>
  );
};
