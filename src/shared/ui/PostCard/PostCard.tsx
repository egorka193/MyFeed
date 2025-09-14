import { type PostModel } from "@/shared/types/api-types";
import SvgHeart from "../icons/Heart";
import SvgShare from "../icons/Share";
import styles from "./PostCard.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/store/store";
import { toggleFavorite } from "@/features/favorites/model/favoritesSlice";
import { Avatar } from "../Avatar/Avatar";
import { ShareModal } from "../ShareModal/ShareModal";
import { PostAuthorActions } from "../PostAuthorActions/PostAuthorActions";
import { ModalConfirmDelete } from "../ModalConfirmDelete/ModalConfirmDelete";

type PostCardProps = {
  post: PostModel;
  actionsType?: "author" | "viewer";
  disabled?: boolean;
  deleteHandler?: (id: string) => Promise<void>;
  withFavorites?: boolean;
  withShare?: boolean;
  onEdit?: (post: PostModel) => void;
  onOpen?: () => void;
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  actionsType = "viewer",
  disabled,
  deleteHandler,
  withFavorites = true,
  withShare = true,
  onEdit,
  onOpen,
}) => {
  const { id, title, description, mediaUrl, author, createdAt } = post;

  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isLiked = favorites.some((fav) => fav.id === id);

  const isLong = description.length > 150;
  const postUrl = `${window.location.origin}/posts/${id}`;

  const handleDelete = async () => {
    if (!deleteHandler) return;
    try {
      await deleteHandler(id);
    } catch (err) {
      console.error("Ошибка при удалении поста:", err);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <Avatar url={author.avatarUrl ?? ""} />
        <div className={styles.postAuthor}>
          <span className={styles.postName}>
            {author.firstName} {author.lastName}
          </span>
          <span className={styles.postDate}>
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        {actionsType === "author" && (
          <PostAuthorActions
            id={id}
            disabled={disabled}
            deleteHandler={() => setConfirmOpen(true)}
            onShare={() => setShareOpen(true)}
            onEdit={() => onEdit?.(post)}
          />
        )}
      </div>

      <h2
        className={styles.postTitle}
        onClick={onOpen}
        style={{ cursor: "pointer" }}
      >
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
            onClick={() => setExpanded((prev) => !prev)}
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

      {withShare && (
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          postUrl={postUrl}
        />
      )}

      <ModalConfirmDelete
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};
