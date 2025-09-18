import { type FC, useState } from "react";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { useMyPostDelete } from "@/features/myPosts/__generated__/myPosts";
import type { PostModel } from "@/shared/types/api-types";
import { useToaster } from "@/features/toaster/useToaster";

interface DeletePostModalProps {
  open: boolean;
  onClose: () => void;
  post: PostModel;
  onDeleted?: (id: string) => void;
}

export const DeletePostModal: FC<DeletePostModalProps> = ({
  open,
  onClose,
  post,
  onDeleted,
}) => {
  const [deletePost, { loading }] = useMyPostDelete();
  const [error, setError] = useState<string | null>(null);
  const { toastSuccess, toastError } = useToaster();

  const handleDelete = async () => {
    try {
      const { data } = await deletePost({
        variables: { input: { id: post.id } },
      });

      if (data?.postDelete?.ok) {
        toastSuccess("Пост удален");
        onDeleted?.(post.id);
        handleClose();
      } else {
        setError("Не удалось удалить пост");
        toastError("Не удалось удалить пост");
      }
    } catch {
      setError("Ошибка сервера");
      toastError("Ошибка сервера");
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <ConfirmModal
      open={open}
      onClose={handleClose}
      title="Удалить эту запись?"
      message={error ?? "После удаления запись нельзя будет восстановить."}
      primaryAction={{
        label: loading ? "Удаляю..." : "Удалить",
        onClick: handleDelete,
        variant: "primary",
        disabled: loading,
      }}
      secondaryAction={{
        label: "Отменить",
        onClick: handleClose,
        variant: "secondary",
      }}
    />
  );
};
