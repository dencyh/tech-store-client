import React from "react";
import StarRating from "./starRating";
import styles from "./reviews.module.scss";

const ReviewItem = () => {
  return (
    <div>
      <div className={styles.review_date}>17.12.2022</div>
      <div className={styles.review_header}>
        <h4>Иван И.</h4>
        <div>
          <StarRating value={4} />
        </div>
      </div>
      <div>
        <div className={styles.review_section}>
          <h4>Достоинства:</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            aliquam cum impedit! Quae mollitia eius amet tempore quod voluptatem
            sapiente.
          </p>
        </div>
        <div className={styles.review_section}>
          <h4>Недостатки:</h4>
          <p>Нет</p>
        </div>
        <div className={styles.review_section}>
          <h4>Комментарий:</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            aliquam cum impedit! Quae mollitia eius amet tempore quod voluptatem
            sapiente.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ReviewItem;
