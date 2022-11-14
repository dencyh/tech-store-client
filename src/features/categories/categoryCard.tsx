import React from "react";
import { Link } from "react-router-dom";
import styles from "./categories.module.scss";
import AccessoriesImg from "../../assets/img/watch.png";
console.log(AccessoriesImg);

const CategoryCard = () => {
  return (
    <Link to={"/"} className={styles.card}>
      <h3 className={styles.card__title}>Item</h3>
      <div className={styles.card__img}>
        <img src={AccessoriesImg} alt="category image" />
      </div>
    </Link>
  );
};

export default CategoryCard;
