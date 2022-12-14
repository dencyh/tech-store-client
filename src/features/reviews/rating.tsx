import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./reviews.module.scss";

const arr = Array(5)
  .fill(0)
  .map((_, i) => i);

interface Props {
  value: number;
}
const Rating: React.FC<Props> = ({ value }) => {
  return (
    <div className={styles.average}>
      <ul className={styles.stars}>
        {arr.map((item) => (
          <li key={item} className={styles.star__item}>
            <FontAwesomeIcon icon={faStar} />
          </li>
        ))}
        <li
          className={styles.stars_bg}
          style={{ width: `${Math.floor((value / 5) * 100)}%` }}
        >
          {arr.map((item) => (
            <div key={item} className={styles.star__item_active}>
              <FontAwesomeIcon icon={faStar} />
            </div>
          ))}
        </li>
      </ul>{" "}
      <p>
        <span className={styles.rating_num}>{value}</span>
      </p>
    </div>
  );
};
export default Rating;
