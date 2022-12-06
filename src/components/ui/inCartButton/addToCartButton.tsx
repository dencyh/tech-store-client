import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./addToCartButton.module.scss";

interface Props {
  onAdd: () => void;
  onRemove?: () => void;
  inCart: boolean;
}

const AddToCartButton: React.FC<Props> = ({ onAdd, onRemove, inCart }) => {
  return (
    <button
      className={`${styles.btn} ${inCart ? styles.btn_active : ""}`}
      onClick={inCart ? onRemove : onAdd}
    >
      <span className={styles.btn__icon}>
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
      <span>{inCart ? "В корзине" : "В корзину"}</span>
    </button>
  );
};
export default AddToCartButton;
