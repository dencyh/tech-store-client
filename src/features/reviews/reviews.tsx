import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "./rating";
import ReviewItem from "./reviewItem";
import ReviewModal from "./reviewModal";
import styles from "./reviews.module.scss";
import { useGetReviewsQuery } from "./reviewsSlice";
import Summary from "./summary";
import SummaryItem from "./summaryItem";

const initSummary = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
  total: 0,
  average: 0
};

export type SummaryType = typeof initSummary;

const Reviews = () => {
  const { id } = useParams();
  if (!id) return null;

  const { data: reviews = [] } = useGetReviewsQuery(id);

  const summary = useMemo(() => {
    const summary: SummaryType = initSummary;
    reviews.forEach((review) => {
      const value = summary[review["score"] as keyof SummaryType];
      summary[review["score"] as keyof SummaryType] = value ? value + 1 : 1;
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
        {reviews.length > 0 ? (
          <h2 className={styles.section_title}></h2>
        ) : (
          <>
            <h2 className={styles.section_title}>Отзывов нет</h2>

            <p>
              Поделитесь своими впечатлениями, чтобы помочь другим покупателям
            </p>
          </>
        )}

        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
      <Summary summary={summary} />
    </div>
  );
};
export default Reviews;
