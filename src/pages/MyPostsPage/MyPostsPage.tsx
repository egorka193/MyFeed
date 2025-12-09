import { useState, useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "@/shared/store/store";
import { usePaginationMyPosts } from "@/features/myPosts/hooks/usePaginationMyPosts";
import { CreatePostForm } from "@/features/createPost/ui/CreatePostForm";
import { DeletePostModal } from "@/features/deletePost/DeletePostModal";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button } from "@/shared/ui/Button/Button";
import SvgIllustration from "@/shared/ui/icons/Illustration";
import { MyPostsList } from "@/features/myPosts/ui/MyPostsList";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import { Modal } from "@/shared/ui/Modal/Modal";
import type { PostModel } from "@/shared/types/api-types";
import styles from "./MyPostsPage.module.css";

export const MyPostsPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<PostModel | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<PostModel | null>(
    null,
  );

  const currentUser = useAppSelector((state) => state.auth.user);

  const {
    posts: serverPosts,
    isLoading,
    hasMore,
    getMorePosts,
  } = usePaginationMyPosts();

  const [posts, setPosts] = useState<PostModel[]>(serverPosts ?? []);

  useEffect(() => {
    if (JSON.stringify(serverPosts) !== JSON.stringify(posts)) {
      setPosts(serverPosts);
    }
  }, [serverPosts]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) getMorePosts();
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, getMorePosts],
  );

  const handleCreatePostClick = () => setIsCreating(true);
  const handleEditPost = (post: PostModel) => setEditingPost(post);
  const handleOpenPost = (post: PostModel) => setSelectedPost(post);
  const handleModalClose = () => setSelectedPost(null);

  const handlePostDeleted = (postId: string) => {
    setDeleteConfirmPost(null);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <PageContainer>
      {isCreating || editingPost ? (
        <CreatePostForm
          initialPost={editingPost ?? undefined}
          onCancel={() => {
            setIsCreating(false);
            setEditingPost(null);
          }}
          onSuccess={() => {
            setEditingPost(null);
            setIsCreating(false);
          }}
        />
      ) : posts.length === 0 && !isLoading ? (
        <div className={styles.emptyState}>
          <SvgIllustration className={styles.illustration} />
          <p className={styles.emptyText}>У вас пока нет постов</p>
          <Button
            variant="primary"
            onClick={handleCreatePostClick}
            className={styles.addPostButton}
          >
            Создать пост
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.newPostBox}>
            <div className={styles.newPostBoxLeft}>
              <Avatar url={currentUser?.avatarUrl ?? ""} />
              <span className={styles.newPostText}>
                Что у вас нового, {currentUser?.firstName}?
              </span>
            </div>
            <Button
              variant="primary"
              onClick={handleCreatePostClick}
              className={styles.addPostButton}
            >
              Создать пост
            </Button>
          </div>

          <MyPostsList
            posts={posts}
            onEdit={handleEditPost}
            onDelete={setDeleteConfirmPost}
            onOpen={handleOpenPost}
            lastItemRef={lastItemRef}
          />

          {isLoading && <p>Загрузка новых постов...</p>}
        </>
      )}

      {selectedPost && (
        <Modal onClose={handleModalClose}>
          <PostCard
            post={selectedPost}
            actionsType="author"
            onEdit={handleEditPost}
            onOpen={() => handleOpenPost(selectedPost)}
            onDeleteClick={() => setDeleteConfirmPost(selectedPost)}
          />
        </Modal>
      )}

      {deleteConfirmPost && (
        <DeletePostModal
          open={!!deleteConfirmPost}
          onClose={() => setDeleteConfirmPost(null)}
          post={deleteConfirmPost}
          onDeleted={handlePostDeleted}
        />
      )}
    </PageContainer>
  );
};
