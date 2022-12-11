import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./reviews.module.scss";
import StarRating from "./starRating";

const startArr = Array(5)
  .fill(0)
  .map((_, i) => i);

const Reviews = () => {
  return (
    <div>
      <h1>Reviews</h1>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Оценки пользователей</h3>
          <div className={styles.summary}>
            <ul className={styles.stars}>
              {startArr.map((item) => (
                <li key={item} className={styles.star__item}>
                  <FontAwesomeIcon icon={faStar} />
                </li>
              ))}
              <li
                className={styles.stars_bg}
                style={{ width: `${(4.7 / 5) * 100}%` }}
              >
                {startArr.map((item) => (
                  <div key={item} className={styles.star__item_active}>
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                ))}
              </li>
            </ul>

            <p className={styles.rating_num}>4.7</p>
          </div>
          <p className={styles.reviews_count}>40 отзывов</p>
        </div>
      </div>
      <StarRating />
    </div>
  );
};
export default Reviews;
