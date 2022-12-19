import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./reviews.module.scss";
import plural from "plural-ru";

interface Props {
  score: number;
  count: number;
  total: number;
}
const SummaryItem: React.FC<Props> = ({ score, count, total }) => {
  return (
    <li className={styles.summary_stars_reviews} key={score}>
      <div className={styles.start_summary_container}>
        <span className={styles.star_number}>{score}</span>
        <FontAwesomeIcon icon={faStar} className={styles.active_star} />
        <div className={styles.percent}>
          <div
            className={styles.percent_active}
            style={{ width: `${(count / total) * 100}%` }}
          ></div>
        </div>
      </div>
      <span> {plural(count, "%d отзыв", "%d отзыва", "%d отзывов")}</span>
    </li>
  );
};
export default SummaryItem;
