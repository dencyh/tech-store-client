import React from "react";
import StarRating from "./starRating";
import styles from "./reviews.module.scss";
import { Review } from "./reviewsSlice";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  review: Review;
}

const ReviewItem: React.FC<Props> = ({ review }) => {
  return (
    <div className={styles.review_item}>
      <div className={styles.review_date}>
        {dayjs(review.createdAt).format("DD/MM/YYYY")}
      </div>
      <div className={styles.review_header}>
        <h4>{review.user.firstName + " " + review.user.lastName[0]}</h4>
        <div>
          <StarRating value={review.score} />
        </div>
      </div>
      <div className={styles.review_body}>
        <div className={styles.review_section}>
          <h4>Достоинства:</h4>
          <p>{review.review.advantages}</p>
        </div>
        <div className={styles.review_section}>
          <h4>Недостатки:</h4>
          <p>{review.review.disadvantages}</p>
        </div>
        <div className={styles.review_section}>
          <h4>Комментарий:</h4>
          <p>{review.review.comment}</p>
        </div>
      </div>
      <div className={styles.reaction}>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} />
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsDown} />
        </span>
      </div>
    </div>
  );
};
export default ReviewItem;
