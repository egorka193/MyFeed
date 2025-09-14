import styles from "./PostAuthorActions.module.css";
import Share from '@/shared/ui/icons/Share.tsx'
import Edit from '@/shared/ui/icons/Edit.tsx'
import Delete from '@/shared/ui/icons/Delete.tsx'
import type { PostModel } from '@/shared/types/api-types.ts'

type PostAuthorActionsProps = {
  id: PostModel['id'],
  disabled?: boolean,
  deleteHandler?: (id: string) => Promise<void>,
  onShare?: () => void,
  onEdit?: () => void,
}

export const PostAuthorActions = (props: PostAuthorActionsProps) => {
  return (
    <div className={styles.authorActions}>
      <button
        className={styles.authorActionsItem}
        disabled={props.disabled}
        onClick={props.onShare}
      >
        <Share/>
      </button>
      <button
        className={styles.authorActionsItem}
        disabled={props.disabled}
        onClick={() => {
          if (props.deleteHandler) {
            props.deleteHandler(props.id)
          }
        }}
      >
        <Delete/>
      </button>
      <button
        className={styles.authorActionsItem}
        disabled={props.disabled}
        onClick={props.onEdit}
      >
        <Edit/>
      </button>
    </div>
  );
};
