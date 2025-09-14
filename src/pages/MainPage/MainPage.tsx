import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGetPostsLazyQuery } from "@/features/getPosts/api/__generated__/getPosts";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import { PostFilterType } from "@/shared/types/api-types";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { PostsDropdown } from "@/shared/ui/PostsDropDown/PostsDropDown";
import { Modal } from "@/shared/ui/Modal/Modal"; 
import styles from "./MainPage.module.css";

export const MainPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<PostFilterType>(PostFilterType.New);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [cursor, setCursor] = useState<string | null>(null); 
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const [fetchPosts] = useGetPostsLazyQuery();

  const loadPosts = useCallback(
    async (reset = false) => {
      setLoading(true);
      const { data } = await fetchPosts({
        variables: {
          input: {
            type: sortOrder,
            limit: 10,
            afterCursor: reset ? null : cursor, 
          },
        },
      });

      if (data?.posts) {
        const newPosts = data.posts.data ?? [];
        setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));

        const newCursor = data.posts.pageInfo?.afterCursor ?? null;
        setCursor(newCursor);

        setHasMore(!!newCursor);
      }

      setLoading(false);
    },
    [fetchPosts, sortOrder, cursor]
  );

  useEffect(() => {
    setCursor(null); 
    loadPosts(true);
  }, [sortOrder]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts]
  );

  const handleSortChange = (value: PostFilterType) => {
    setPosts([]);
    setHasMore(true);
    setSortOrder(value);
  };

  return (
    <PageContainer>
      <div className={styles.header}>
        <PostsDropdown value={sortOrder} onChange={handleSortChange} />
      </div>

      <div className={styles.postsContainer}>
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={index === posts.length - 1 ? lastItemRef : undefined}
          >
            <PostCard 
              post={post} 
              onOpen={() => setSelectedPost(post)} 
            />
          </div>
        ))}
      </div>

      {loading && <p>Загрузка...</p>}
      {!loading && !posts.length && <p>Нет постов</p>}

      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <PostCard 
            post={selectedPost} 
            withShare={false} 
            withFavorites={false}
          />
        </Modal>
      )}
    </PageContainer>
  );
};
