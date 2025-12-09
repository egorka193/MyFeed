import { type FC } from "react";
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
  const { toastSuccess, toastError } = useToaster();

  const [deletePost, { loading }] = useMyPostDelete({
    onCompleted: (data) => {
      if (data?.postDelete?.ok) {
        toastSuccess("Пост удалён");
        onDeleted?.(post.id);
        onClose();
      } else {
        toastError("Не удалось удалить пост");
      }
    },
    onError: () => {
      toastError("Ошибка сервера");
    },
  });

  const handleDelete = () => {
    deletePost({ variables: { input: { id: post.id } } });
  };

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title="Удалить эту запись?"
      message="После удаления запись нельзя будет восстановить."
      primaryAction={{
        label: loading ? "Удаляю..." : "Удалить",
        onClick: handleDelete,
        variant: "primary",
        disabled: loading,
      }}
      secondaryAction={{
        label: "Отменить",
        onClick: onClose,
        variant: "secondary",
      }}
    />
  );
};
