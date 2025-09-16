import { useRef } from "react";
import styles from "./Dropzone.module.css";

type DropzoneProps = {
  onFileSelect: (file: File) => void;
  preview?: string | null;
  uploading?: boolean;
  progress?: number;
};

export const Dropzone = ({ onFileSelect, preview, uploading, progress }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={styles.dropzone}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className={styles.previewWrapper}>
          <img src={preview} alt="preview" className={styles.previewImg} />
          {uploading && (
            <div className={styles.progressBarWrapper}>
            <div
              className={`${styles.progressBar} ${uploading && progress! < 100 ? styles.animate : ""}`}
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
          
          )}
        </div>
      ) : (
        <p>Перетащите фото сюда или выберите фото с вашего компьютера</p>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};
