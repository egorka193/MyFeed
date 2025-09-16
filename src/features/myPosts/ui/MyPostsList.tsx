import { PostCard } from '@/shared/ui/PostCard/PostCard';
import type { PostModel } from '@/shared/types/api-types';

type MyPostsListProps = {
  posts: PostModel[];
  disabled?: boolean;
  onEdit: (post: PostModel) => void;
  onDelete: (post: PostModel) => void;
  onOpen: (post: PostModel) => void;
  lastItemRef?: (node: HTMLDivElement | null) => void;
};

export const MyPostsList = ({ posts, disabled, onEdit, onDelete, onOpen, lastItemRef }: MyPostsListProps) => (
  <>
    {posts.map((post, index) => (
      <div key={post.id} ref={index === posts.length - 1 ? lastItemRef : undefined}>
        <PostCard
          post={post}
          actionsType="author"
          disabled={disabled}
          onEdit={onEdit}
          onOpen={() => onOpen(post)}
          onDeleteClick={() => onDelete(post)}
        />
      </div>
    ))}
  </>
);
