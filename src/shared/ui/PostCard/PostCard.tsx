import { type PostModel } from "@/shared/types/api-types";
import SvgHeart from "../icons/Heart";
import SvgShare from "../icons/Share";
import styles from "./PostCard.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/store/store";
import { toggleFavorite } from "@/features/favorites/model/favoritesSlice";
import { Avatar } from "../Avatar/Avatar";
import { PostAuthorActions } from "../PostAuthorActions/PostAuthorActions";
import { SharePostModal } from "@/features/sharePost/SharePostModal";

type PostCardProps = {
  post: PostModel;
  actionsType?: "author" | "viewer";
  disabled?: boolean;
  onEdit?: (post: PostModel) => void;
  onOpen?: () => void;
  onDeleteClick?: () => void; 
  withShare?: boolean;      
  withFavorites?: boolean; 
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  actionsType = "viewer",
  disabled,
  onEdit,
  onOpen,
  onDeleteClick,
  withShare = true,
  withFavorites = true,
}) => {
  const { title, description, mediaUrl, author, createdAt, id } = post;

  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isLiked = favorites.some((fav) => fav.id === id);

  const isLong = description.length > 150;
  const postUrl = `${window.location.origin}/posts/${id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
    } catch {
      console.error("Не удалось скопировать ссылку");
    }
    setShareOpen(false);
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderInfo}>
          <Avatar url={author.avatarUrl ?? ""} />
          <div className={styles.postAuthor}>
            <span className={styles.postName}>
              {author.firstName} {author.lastName}
            </span>
            <span className={styles.postDate}>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={styles.postActionsWrapper}>
          {actionsType === "author" && (
            <PostAuthorActions
              id={id}
              disabled={disabled}
              deleteHandler={onDeleteClick} 
              onShare={() => setShareOpen(true)}
              onEdit={() => onEdit?.(post)}
            />
          )}
        </div>
      </div>

      <h2 className={styles.postTitle} onClick={onOpen} style={{ cursor: "pointer" }}>
        {title}
      </h2>

      {mediaUrl && (
        <img
          src={mediaUrl}
          alt={title}
          className={styles.postImage}
          onClick={onOpen}
          style={{ cursor: "pointer" }}
        />
      )}

      <p className={styles.postDescription}>
        {expanded || !isLong ? description : description.slice(0, 150) + "... "}
        {isLong && (
          <button
            onClick={() => setExpanded(prev => !prev)}
            className={styles.readMoreInlineBtn}
          >
            {expanded ? "Свернуть" : "Читать больше"}
          </button>
        )}
      </p>

      <div className={styles.postFooter}>
        {withFavorites && (
          <button
            className={`${styles.likeBtn} ${isLiked ? styles.liked : ""}`}
            onClick={() => dispatch(toggleFavorite(post))}
          >
            <SvgHeart />
          </button>
        )}

        {withShare && (
          <button className={styles.likeBtn} onClick={() => setShareOpen(true)}>
            <SvgShare />
          </button>
        )}
      </div>

      {withShare && <SharePostModal open={shareOpen} onClose={() => setShareOpen(false)} postUrl={postUrl} />}
    </div>
  );
};
