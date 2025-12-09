import { useState } from "react";
import type { PostFilterType } from "@/shared/types/api-types";
import { MainPostsList } from "@/features/mainPostList/MainPostList";
import { PostModal } from "@/features/PostModal/PostModal";

interface PostsListWidgetProps {
  filter: PostFilterType;
}

export const PostsListWidget: React.FC<PostsListWidgetProps> = ({ filter }) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  return (
    <>
      <MainPostsList
        filter={filter}
        onOpenPost={(post) => setSelectedPostId(post.id)}
      />

      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
        />
      )}
    </>
  );
};
