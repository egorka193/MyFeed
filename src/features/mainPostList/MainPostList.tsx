import { useCallback, useRef } from "react";
import { usePaginationPosts } from "@/features/getPosts/hooks/usePaginationPosts";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import type { PostModel, PostFilterType } from "@/shared/types/api-types";

interface MainPostsListProps {
  filter: PostFilterType;
  onOpenPost?: (post: PostModel) => void;
}

export const MainPostsList: React.FC<MainPostsListProps> = ({
  onOpenPost,
  filter,
}) => {
  const { data, isLoading, getMorePosts } = usePaginationPosts(filter);
  const posts = data?.posts?.data ?? [];
  const afterCursor = data?.posts?.pageInfo?.afterCursor ?? null;

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !afterCursor) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, afterCursor, getMorePosts],
  );

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastItemRef : undefined}
        >
          <PostCard post={post} onOpen={() => onOpenPost?.(post)} />
        </div>
      ))}

      {isLoading && <p>Загрузка...</p>}
      {!isLoading && !posts.length && <p>Нет постов</p>}
    </div>
  );
};
