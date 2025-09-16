import { useState } from "react";
import { usePostCreate } from "@/features/createPost/api/__generated__/createPost";
import { useMyPostDelete } from "@/features/myPosts/__generated__/myPosts"; 
import { Input } from "@/shared/ui/Input/Input";
import { Button } from "@/shared/ui/Button/Button";
import { Dropzone } from "@/shared/ui/DropZone/DropZone";
import { fileApi } from "@/shared/api/axios/fileApi";
import styles from "./CreatePosts.module.css";
import type { PostModel } from "@/shared/types/api-types";

type CreatePostFormProps = {
  initialPost?: PostModel;
  onSuccess: (post: PostModel) => void;
  onCancel: () => void;
};

export const CreatePostForm = ({ initialPost, onSuccess, onCancel }: CreatePostFormProps) => {
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [description, setDescription] = useState(initialPost?.description ?? "");
  const [mediaUrl, setMediaUrl] = useState<string | null>(initialPost?.mediaUrl ?? null);
  const [preview, setPreview] = useState<string | null>(initialPost?.mediaUrl ?? null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [createPost, { loading: creating, error: createError }] = usePostCreate();
  const [deletePost] = useMyPostDelete();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);
  
      const responseLink = await fileApi.getUploadLink(file.name, "POSTS");
      const link = responseLink.data;
  
      await fileApi.uploadImage(link, file, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });
  
      const uploadedUrl = link.split("?")[0];
      setMediaUrl(uploadedUrl);
      setPreview(URL.createObjectURL(file));
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    try {
      if (initialPost) {
        await deletePost({ variables: { input: { id: initialPost.id } } });

        const response = await createPost({
          variables: {
            input: {
              title,
              description,
              mediaUrl: mediaUrl ?? "",
            },
          },
        });

        if (response.data?.postCreate) {
          const newPost: PostModel = {
            ...response.data.postCreate,
            authorId: response.data.postCreate.author.id,
            deletedAt: null,
            updatedAt: response.data.postCreate.createdAt,
          };
          onSuccess(newPost);
        }
      } else {
        const response = await createPost({
          variables: {
            input: {
              title,
              description,
              mediaUrl: mediaUrl ?? "",
            },
          },
        });

        if (response.data?.postCreate) {
          const newPost: PostModel = {
            ...response.data.postCreate,
            authorId: response.data.postCreate.author.id,
            deletedAt: null,
            updatedAt: response.data.postCreate.createdAt,
          };
          onSuccess(newPost);
          setTitle("");
          setDescription("");
          setMediaUrl(null);
          setPreview(null);
        }
      }
    } catch (error: any) {
      console.error("ApolloError:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={styles.createFormTitle}>
        {initialPost ? "Редактирование поста" : "Создание поста"}
      </h2>

      <Input
        label="Заголовок"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <Dropzone onFileSelect={handleFileUpload} preview={preview} uploading={uploading} />

      <Input
        label="Описание"
        value={description}
        onChange={handleDescriptionChange}
        required
        minLength={40}
        error={validationError ?? undefined}
        status={validationError ? "error" : undefined}
      />

      <div className={styles.createFormActions}>
        <Button type="button" variant="secondary" onClick={handleCancel} className={styles.cancelButton}>
          Отмена
        </Button>
        <Button type="submit" variant="primary" loading={creating} className={styles.createPostButton}>
          {initialPost ? "Сохранить" : "Создать пост"}
        </Button>
      </div>

      {validationError && (
        <p className={styles.errorText}>Ошибка: {validationError}</p>
      )}

      {!validationError && createError && (
        <p className={styles.errorText}>Ошибка: {createError.message}</p>
      )}
    </form>
  );
};
