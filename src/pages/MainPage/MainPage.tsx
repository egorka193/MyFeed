import React, { useCallback, useRef, useState } from "react";
import { usePaginationPosts } from "@/features/getPosts/hooks/usePaginationPosts";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { Modal } from "@/shared/ui/Modal/Modal";
import { PostsDropdown } from "@/shared/ui/PostsDropDown/PostsDropDown";
import { PostFilterType } from "@/shared/types/api-types";
import styles from "./MainPage.module.css";

export const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<PostFilterType>(PostFilterType.New);

  const { data, isLoading, getMorePosts } = usePaginationPosts(filter);
  const posts = data?.posts?.data ?? [];
  const afterCursor = data?.posts?.pageInfo?.afterCursor ?? null;

  const [selectedPost, setSelectedPost] = useState<any | null>(null);
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
    [isLoading, afterCursor, getMorePosts]
  );

  const handleModalClose = () => setSelectedPost(null);
  const handleOpenPost = (post: any) => setSelectedPost(post);

  return (
    <PageContainer>
      <PostsDropdown value={filter} onChange={setFilter} />

      <div className={styles.postsContainer}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastItemRef : undefined}
          >
            <PostCard post={post} onOpen={() => handleOpenPost(post)} />
          </div>
        ))}
      </div>

      {isLoading && <p>Загрузка...</p>}
      {!isLoading && !posts.length && <p>Нет постов</p>}

      {selectedPost && (
        <Modal onClose={handleModalClose}>
          <PostCard post={selectedPost} withShare={false} withFavorites={false} />
        </Modal>
      )}
    </PageContainer>
  );
};
