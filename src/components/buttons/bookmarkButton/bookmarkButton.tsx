import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./bookmarkButton.module.scss";

interface Props {
  textAdd?: string;
  textRemove?: string;
  inBookmarks: boolean;
  onAdd: () => void;
  onRemove: () => void;
}
const BookmarkButton: React.FC<Props> = ({
  textAdd,
  textRemove,
  inBookmarks,
  onAdd,
  onRemove
}) => {
  return (
    <button
      className={styles.bookmark}
      onClick={inBookmarks ? () => onRemove() : () => onAdd()}
    >
      {inBookmarks ? (
        <>
          <span className={styles.btn__icon_added}>
            <FontAwesomeIcon icon={faBookmarkSolid} />
          </span>
          <span>{textRemove || "В избранном"}</span>
        </>
      ) : (
        <>
          <span className={styles.btn__icon}>
            <FontAwesomeIcon icon={faBookmarkRegular} />
          </span>
          <span>{textAdd || "Добавить в избранное"}</span>
        </>
      )}
    </button>
  );
};
export default BookmarkButton;
