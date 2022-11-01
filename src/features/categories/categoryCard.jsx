import React from "react";
import { Link } from "react-router-dom";
import styles from "./categories.module.scss";

const CategoryCard = () => {
  return (
    <Link className={styles.card}>
      <h3 className={styles.card__title}>Item</h3>
      <div className={styles.card__img}></div>
    </Link>
  );
};

export default CategoryCard;
