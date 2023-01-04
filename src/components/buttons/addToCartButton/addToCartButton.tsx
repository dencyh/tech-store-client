import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./addToCartButton.module.scss";
import cn from "classnames";

interface Props {
  onAdd: () => void;
  onRemove?: () => void;
  inCart: boolean;
  textAdd?: string;
  textDelete?: string;
}

const AddToCartButton: React.FC<Props> = ({
  onAdd,
  onRemove,
  inCart,
  textAdd,
  textDelete
}) => {
  return (
    <button
      className={cn(styles.btn, inCart ? styles.btn_active : "")}
      onClick={inCart ? onRemove : onAdd}
    >
      <span className={styles.btn__icon}>
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
      <span>{inCart ? textDelete || "В корзине" : textAdd || "В корзину"}</span>
    </button>
  );
};
export default AddToCartButton;
