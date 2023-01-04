import React from "react";
import styles from "./categories.module.scss";
import PlaceholderPhoto from "../../assets/img/placeholder-camera-sm.webp";
import cn from "classnames";

const PlaceholderCard = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title_placeholder}></h3>
      <div className={cn(styles.card__img, styles.placeholder_img)}>
        <img src={PlaceholderPhoto} alt="product photo" />
      </div>
    </div>
  );
};
export default PlaceholderCard;
