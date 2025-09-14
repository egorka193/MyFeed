import { useMyPostsLazyQuery, useMyPostDelete } from '@/features/myPosts/__generated__/myPosts'
import styles from './MyPostsPage.module.css'
import { PostCard } from '@/shared/ui/PostCard/PostCard.tsx'
import { useCallback, useEffect, useRef, useState } from 'react'
import SvgIllustration from '@/shared/ui/icons/Illustration'
import { Button } from '@/shared/ui/Button/Button'
import type { PostModel } from '@/shared/types/api-types'
import { CreatePostForm } from '@/features/createPost/ui/CreatePostForm'
import { PageContainer } from '@/shared/ui/PageContainer/PageContainer'
import { Modal } from '@/shared/ui/Modal/Modal'
import { ModalConfirmDelete } from '@/shared/ui/ModalConfirmDelete/ModalConfirmDelete'
import { useAppSelector } from '@/shared/store/store'
import { Avatar } from '@/shared/ui/Avatar/Avatar'

export const MyPostsPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const [editingPost, setEditingPost] = useState<PostModel | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<PostModel | null>(null);
  const currentUser = useAppSelector(state => state.auth.user);

  const safePosts = posts ?? [];
  const afterCursor = safePosts.length ? safePosts[safePosts.length - 1].id : '';

  const [fetchMyPosts] = useMyPostsLazyQuery({ variables: { input: { limit: 10, afterCursor } } });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const afterCursor = posts.length ? posts[posts.length - 1].id : '';
  
      const response = await fetchMyPosts({
        variables: { input: { limit: 10, afterCursor } },
      });
  
      console.log("fetchMyPosts response:", response);
  
      if (response.data?.myPosts) {
        const newPosts = (response.data.myPosts.data || []).map(post => ({
          ...post,
          authorId: post.author.id,
        })) as PostModel[];
  
        setPosts(prev => {
          const merged = [...prev, ...newPosts];
          const unique = merged.filter(
            (p, index, self) => index === self.findIndex(other => other.id === p.id)
          );
          return unique;
        });
  
        if (response.data.myPosts.pageInfo?.count) {
          setHasMore(
            response.data.myPosts.pageInfo.count >
            (posts.length + newPosts.length)
          );
        }
      }
    } catch (err: any) {
      console.error("Ошибка при запросе постов:", err.message);
      if (err.graphQLErrors) console.error("GraphQL Errors:", err.graphQLErrors);
      if (err.networkError) console.error("Network Error:", err.networkError);
      console.error("Full error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  useEffect(() => {
    const initialFetch = async () => {
      await fetchPosts();
      setInitialLoading(false);
    };
    initialFetch();

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const [deletePost] = useMyPostDelete();
  const deleteHandler = async (id: string) => {
    setDisabled(true);
    await deletePost({ variables: { input: { id } } });
    const newPosts = posts?.filter((post) => post.id !== id);
    setPosts(newPosts);
    setDisabled(false);
  };

  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts()
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  if (isCreating || editingPost) {
    return (
      <PageContainer>
        <div className={styles.createForm}>
          <CreatePostForm
            initialPost={editingPost ?? undefined}
            onCancel={() => {
              setIsCreating(false);
              setEditingPost(null);
            }}
            onSuccess={(newPost) => {
              if (editingPost) {
                setPosts(prev =>
                  prev.map(p => p.id === editingPost.id ? newPost : p)
                );
                setEditingPost(null);
              } else {
                setPosts(prev => [newPost, ...prev]);
                setIsCreating(false);
              }
            }}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <div className={styles.container}>
      {initialLoading && <p>Loading your posts...</p>}

      {!initialLoading && !posts?.length && (
        <div className={styles.emptyState}>
          <SvgIllustration className={styles.illustration} />
          <p className={styles.emptyText}>У вас пока нет постов</p>
          <Button 
            variant="primary" 
            className={styles.addPostButton}
            onClick={() => setIsCreating(true)} 
          >
            Создать пост
          </Button>
        </div>
      )}

      {!initialLoading && posts?.length > 0 && (
        <>
          <div className={styles.newPostBox}>
            <Avatar url={currentUser?.avatarUrl ?? ""} />
            <span className={styles.newPostText}>
              Что у вас нового, {currentUser?.firstName}?
            </span>
            <Button
              variant="primary"
              className={styles.addPostButton}
              onClick={() => setIsCreating(true)}
            >
              Создать пост
            </Button>
          </div>

          {posts.map((post, index) => (
            <div
              key={post.id}
              className={styles.postItem}
              ref={index === posts.length - 1 ? lastItemRef : undefined}
            >
              <PostCard
                post={post}
                actionsType="author"
                disabled={disabled}
                deleteHandler={deleteHandler} 
                withShare={true}
                withFavorites={false}
                onEdit={() => setEditingPost(post)}
                onOpen={() => setSelectedPost(post)}
              />
            </div>
          ))}
        </>
      )}

      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <PostCard
            post={selectedPost}
            actionsType="author"
            disabled={disabled}
            deleteHandler={deleteHandler}
            withShare={false}
            withFavorites={false}
            onEdit={() => setEditingPost(selectedPost)}
          />
        </Modal>
      )}

      {deleteConfirmPost && (
        <ModalConfirmDelete
          open={!!deleteConfirmPost}
          onClose={() => setDeleteConfirmPost(null)}
          onDelete={async () => {
            if (deleteConfirmPost) {
              await deletePost({ variables: { input: { id: deleteConfirmPost.id } } });
              setPosts(prev => prev.filter(p => p.id !== deleteConfirmPost.id));
              setDeleteConfirmPost(null);
            }
          }}
        />
      )}
    </div>
  );
};
