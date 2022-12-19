import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { divide } from "lodash";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "./rating";
import ReviewItem from "./reviewItem";
import ReviewModal from "./reviewModal";
import styles from "./reviews.module.scss";
import { useGetReviewsQuery } from "./reviewsSlice";
import StarRating from "./starRating";
import SummaryItem from "./summaryItem";

const arr = Array(5)
  .fill(0)
  .map((_, i) => i);

const Reviews = () => {
  const { id } = useParams();
  if (!id) return null;

  const { data: reviews = [] } = useGetReviewsQuery(id);

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const summary = useMemo(() => {
    const summary: { [key: string]: number } = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      total: 0,
      average: 0
    };
    reviews.forEach((review) => {
      const value = summary[review["score"]];
      summary[review["score"]] = value ? value + 1 : 1;
      summary["total"] = summary["total"] + 1;
      summary["average"] = summary["average"] + review.score;
    });
    summary["average"] = reviews[0]?.score
      ? summary["average"] / summary["total"]
      : 0;
    return summary;
  }, [reviews]);

  return (
    <div className={styles.container}>
      <div className={styles.reviews_list}>
        <h2 className={styles.section_title}>Отзывы</h2>

        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
      <div className={styles.inner_container}>
        <div>
          <h3>Оценки пользователей</h3>
          <div className={styles.rating_container}>
            <Rating value={summary.average} />
          </div>

          <ul>
            {arr.map((item) => (
              <SummaryItem
                key={item}
                score={5 - item}
                count={summary[5 - item]}
                total={summary.total}
              />
            ))}
          </ul>
          <button
            className={styles.btn}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Оставить отзыв
          </button>
          {modalOpen && <ReviewModal onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
