import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./reviews.module.scss";

const startArr = Array(5)
  .fill(0)
  .map((_, i) => i + 1);

interface Props {
  value?: number;
  canWrite?: boolean;
}

const StarRating: React.FC<Props> = ({ value, canWrite }) => {
  const [rating, setRating] = useState(value || 0);
  const [hovered, setHovered] = useState(0);
  return (
    <form className={styles.stars}>
      {startArr.map((value) => (
        <label key={value} className={styles.star__label}>
          <input type="radio" className={styles.star__input} value={value} />
          <FontAwesomeIcon
            icon={faStar}
            className={value <= (hovered || rating) ? styles.active_star : ""}
            onClick={canWrite ? () => setRating(value) : undefined}
            onMouseOver={canWrite ? () => setHovered(value) : undefined}
            onMouseOut={canWrite ? () => setHovered(0) : undefined}
          />
        </label>
      ))}
    </form>
  );
};
export default StarRating;
