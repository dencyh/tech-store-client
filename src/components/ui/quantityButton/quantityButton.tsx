import React from "react";
import styles from "./quantityButton.module.scss";

interface Props {
  quantity?: number;
  onDecrement: () => void;
  onIncrement: () => void;
}
const QuantityButton: React.FC<Props> = ({
  quantity = 0,
  onDecrement,
  onIncrement
}) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        aria-label="decrement quantity"
        onClick={onDecrement}
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        className={styles.btn}
        aria-label="increment quantity"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};
export default QuantityButton;
