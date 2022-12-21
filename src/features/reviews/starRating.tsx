import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./reviews.module.scss";

const startArr = Array(5)
  .fill(0)
  .map((_, i) => i + 1);

interface Props {
  name?: string;
  value?: number;
  onChange?: ({
    name,
    value
  }: {
    name: string;
    value: string | number;
  }) => void;
}

const StarRating: React.FC<Props> = ({ value, name, onChange }) => {
  const [rating, setRating] = useState(value || 0);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    if (onChange && name) {
      onChange({ name: name || "", value: rating });
    }
  }, [rating]);

  return (
    <ul className={styles.stars}>
      {startArr.map((value) => (
        <label key={value} className={styles.star__label}>
          <input type="radio" className={styles.star__input} value={value} />
          <FontAwesomeIcon
            icon={faStar}
            className={value <= (hovered || rating) ? styles.active_star : ""}
            onClick={onChange ? () => setRating(value) : undefined}
            onMouseOver={onChange ? () => setHovered(value) : undefined}
            onMouseOut={onChange ? () => setHovered(0) : undefined}
          />
        </label>
      ))}
    </ul>
  );
};
export default StarRating;
