import { Modal } from "@/shared/ui/Modal/Modal";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import { useGetPostById } from "../getPosts/api/__generated__/getPosts";

interface PostModalProps {
  postId: string;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ postId, onClose }) => {
  const { data, loading, error } = useGetPostById({
    variables: { input: { id: postId } },
  });

  if (loading) return <Modal onClose={onClose}>Загрузка...</Modal>;
  if (error) return <Modal onClose={onClose}>Ошибка загрузки</Modal>;
  if (!data?.post) return null;

  return (
    <Modal onClose={onClose}>
      <PostCard post={data.post} withShare={false} withFavorites={false} />
    </Modal>
  );
};
