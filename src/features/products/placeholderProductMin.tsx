import React from "react";
import styles from "./productMin.module.scss";
import PlaceholderPhoto from "../../assets/img/placeholder-camera-sm.webp";
import StarRating from "../reviews/starRating";
import cn from "classnames";

const PlaceholderProductMin = () => {
  return (
    <div className={styles.item}>
      <div className={styles.link}>
        <div className={styles.img_placeholder}>
          <img src={PlaceholderPhoto} alt="product photo" />
        </div>
        <h3 className={styles.name_placeholder}></h3>
        <div className={cn(styles.stars, styles.stars_placeholder)}>
          <StarRating value={0} />
        </div>
        <p className={styles.price_placeholder}></p>
      </div>
    </div>
  );
};
export default PlaceholderProductMin;
