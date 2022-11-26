import { divide } from "lodash";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUploadImagesMutation } from "../../../features/api/apiSlice";
import { Spinner } from "../spinner/spinner";
import styles from "./dnd.module.scss";

const DND = () => {
  const [drag, setDrag] = useState(false);

  const [uploadImages, { isLoading }] = useUploadImagesMutation();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const handleDragLeave = (
    e:
      | React.DragEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("image", file);
    });

    uploadImages({ id: "637c92a21ab6ca4598a84b77", images: formData });
    console.log(formData.getAll("image"));

    setDrag(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
    console.log(e.target.files);
  };

  const [selectedImage, setSelectedImage] = useState<any>({});
  const handleFilesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(URL.createObjectURL(selectedImage));

    const formData = new FormData();

    formData.append("image", selectedImage);

    uploadImages({ id: "637c92a21ab6ca4598a84b77", images: formData });
  };

  return (
    <form onSubmit={handleFilesSubmit}>
      <div
        className={styles.container}
        onDragStart={(e) => handleDragStart(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDragOver={(e) => handleDragStart(e)}
        onMouseOut={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        {drag ? (
          <div className={styles.mouse_out}>
            <span className={styles.tip}>Отпустите файлы для загрузки</span>
          </div>
        ) : (
          <div
            className={styles.mouse_over}
            onDragStart={(e) => handleDragStart(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDragOver={(e) => handleDragStart(e)}
          >
            {isLoading ? (
              <Spinner text="Идет загрузка" />
            ) : (
              <>
                <span className={styles.tip}>
                  Перетащите файлы для загрузки
                </span>
                <span className={styles.option}>или</span>
                <label htmlFor="file">
                  <input
                    className={styles.file_input}
                    id="file"
                    type="file"
                    onChange={handleImageChange}
                    multiple
                  />
                  <div className={styles.file_label}>Открыть проводник</div>
                </label>
              </>
            )}
          </div>
        )}
      </div>
      <button type="submit" className={styles.file_label}>
        Изменить
      </button>
    </form>
  );
};

export default DND;
