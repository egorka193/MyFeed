import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { Input } from "@/shared/ui/Input/Input";
import { type FC, useState } from "react";
import { useToaster } from "@/features/toaster/useToaster";

interface SharePostModalProps {
  open: boolean;
  onClose: () => void;
  postUrl: string;
}

export const SharePostModal: FC<SharePostModalProps> = ({
  open,
  onClose,
  postUrl,
}) => {
  const [url] = useState(postUrl);
  const { toastSuccess, toastError } = useToaster();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toastSuccess("Ссылка скопирована!");
      onClose();
    } catch {
      console.error("Не удалось скопировать ссылку");
      toastError("Ошибка при копировании");
    }
  };

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title="Поделиться этим постом"
      primaryAction={{
        label: "Скопировать ссылку",
        onClick: handleCopy,
        variant: "primary",
      }}
    >
      <Input value={url} readOnly />
    </ConfirmModal>
  );
};
