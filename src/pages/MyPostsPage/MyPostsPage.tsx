import styles from './MyPostsPage.module.css';
import { PostCard } from '@/shared/ui/PostCard/PostCard';
import { useState, useRef, useCallback } from 'react';
import SvgIllustration from '@/shared/ui/icons/Illustration';
import { Button } from '@/shared/ui/Button/Button';
import type { PostModel } from '@/shared/types/api-types';
import { CreatePostForm } from '@/features/createPost/ui/CreatePostForm';
import { PageContainer } from '@/shared/ui/PageContainer/PageContainer';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useAppSelector } from '@/shared/store/store';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { DeletePostModal } from '@/features/deletePost/DeletePostModal';
import { MyPostsList } from '@/features/myPosts/ui/MyPostsList';
import { usePaginationMyPosts } from '@/features/myPosts/hooks/usePaginationMyPosts';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';

export const MyPostsPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<PostModel | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<PostModel | null>(null);

  const currentUser = useAppSelector(state => state.auth.user);

  const { posts, isLoading, hasMore, getMorePosts } = usePaginationMyPosts();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          getMorePosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, getMorePosts]
  );

  const handleCreatePostClick = () => setIsCreating(true);
  const handleEditPost = (post: PostModel) => setEditingPost(post);
  const handleOpenPost = (post: PostModel) => setSelectedPost(post);
  const handleModalClose = () => setSelectedPost(null);

  if (isCreating || editingPost) {
    return (
      <PageContainer>
        <div className={styles.createForm}>
          <CreatePostForm
            initialPost={editingPost ?? undefined}
            onCancel={() => { setIsCreating(false); setEditingPost(null); }}
            onSuccess={() => {
              setEditingPost(null);
              setIsCreating(false);
            }}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <div className={styles.container}>
      {isLoading && !posts.length && <p>Loading your posts...</p>}

      {!isLoading && !posts.length && (
        <div className={styles.emptyState}>
          <SvgIllustration className={styles.illustration} />
          <p className={styles.emptyText}>У вас пока нет постов</p>
          <Button variant="primary" className={styles.addPostButton} onClick={handleCreatePostClick}>
            <span className={styles.desktopText}>Создать пост</span>
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <div className={styles.newPostBox}>
            <Avatar url={currentUser?.avatarUrl ?? ""} />
            <span className={styles.newPostText}>
              Что у вас нового, {currentUser?.firstName}?
            </span>
            <Button variant="primary" className={styles.addPostButton} onClick={handleCreatePostClick}>
              <span className={styles.desktopText}>Создать пост</span>
              <span className={styles.mobileIcon}>+</span>
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
          onDeleted={() => {}}
        />
      )}
    </div>
  );
};
