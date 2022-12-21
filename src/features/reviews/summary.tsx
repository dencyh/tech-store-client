import React, { useState } from "react";
import Rating from "./rating";
import ReviewModal from "./reviewModal";
import { SummaryType } from "./reviews";
import styles from "./reviews.module.scss";
import SummaryItem from "./summaryItem";

const arr = Array(5)
  .fill(0)
  .map((_, i) => i);

interface Props {
  summary: SummaryType;
}
const Summary: React.FC<Props> = ({ summary }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
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
              count={summary[(5 - item) as keyof SummaryType]}
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
  );
};
export default Summary;
