import { type FC, useState } from "react";
import { ConfirmModal } from "@/shared/ui/ConfirmModal/ConfirmModal";
import { useMyPostDelete } from "@/features/myPosts/__generated__/myPosts";
import type { PostModel } from "@/shared/types/api-types";

interface DeletePostModalProps {
  open: boolean;
  onClose: () => void;
  post: PostModel;
  onDeleted?: (id: string) => void; 
}

export const DeletePostModal: FC<DeletePostModalProps> = ({ open, onClose, post, onDeleted }) => {
  const [deletePost, { loading }] = useMyPostDelete();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const { data } = await deletePost({ variables: { input: { id: post.id } } });
      if (data?.postDelete?.ok) {
        onDeleted?.(post.id);
        onClose();
      } else {
        setError("Не удалось удалить пост");
      }
    } catch {
      setError("Ошибка сервера");
    }
  };

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title="Удалить эту запись?"
      message={error ?? "После удаления запись нельзя будет восстановить."}
      primaryAction={{ label: "Удалить", onClick: handleDelete, variant: "primary", disabled: loading }}
      secondaryAction={{ label: "Отменить", onClick: onClose, variant: "secondary" }}
    />
  );
};
