import { useAppSelector } from "../../shared/store/store";
import { PostCard } from "@/shared/ui/PostCard/PostCard";
import { PageContainer } from "@/shared/ui/PageContainer/PageContainer";
import styles from "./FavoritePage.module.css";
import SvgIllustration from "@/shared/ui/icons/Illustration";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button";

export const FavoritesPage = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const currentUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleGoMain = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <SvgIllustration className={styles.illustration} />
          <div className={styles.noFavoritesBox}>
            <span className={styles.noFavoritesText}>
              У вас пока нет избранных постов, {currentUser?.firstName}
            </span>
          </div>
          <Button
            variant="primary"
            className={styles.goHomeButton}
            onClick={handleGoMain}
          >
            На главную
          </Button>
        </div>
      ) : (
        favorites.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </PageContainer>
  );
};
