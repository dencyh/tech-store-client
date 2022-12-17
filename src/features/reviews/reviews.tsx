import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Rating from "./rating";
import ReviewItem from "./reviewItem";
import styles from "./reviews.module.scss";
import StarRating from "./starRating";

const arr = Array(5)
  .fill(0)
  .map((_, i) => i);

const Reviews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.reviews_list}>
        <h2 className={styles.section_title}>Отзывы</h2>

        <ReviewItem />
      </div>
      <div className={styles.inner_container}>
        <div>
          <h3>Оценки пользователей</h3>
          <div className={styles.rating_container}>
            <Rating value={4.6} />
          </div>

          <ul>
            {arr.map((item) => (
              <li className={styles.summary_stars_reviews} key={item}>
                <div className={styles.start_summary_container}>
                  <span className={styles.star_number}>{5 - item}</span>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.active_star}
                  />
                  <div className={styles.percent}>
                    <div
                      className={styles.percent_active}
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <span>{12 - item} отзывов</span>
              </li>
            ))}
          </ul>
          <button className={styles.btn}>Оставить отзыв</button>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
