import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./reviews.module.scss";

const startArr = Array(5)
  .fill(0)
  .map((_, i) => i + 1);

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  return (
    <form className={styles.stars}>
      {startArr.map((value) => (
        <label key={value} className={styles.star__label}>
          <input type="radio" className={styles.star__input} value={value} />
          <FontAwesomeIcon
            icon={faStar}
            className={value <= (hovered || rating) ? styles.active_star : ""}
            onClick={() => setRating(value)}
            onMouseOver={() => setHovered(value)}
            onMouseOut={() => setHovered(0)}
          />
        </label>
      ))}
    </form>
  );
};
export default StarRating;
