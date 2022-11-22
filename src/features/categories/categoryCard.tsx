import React from "react";
import { Link } from "react-router-dom";
import styles from "./categories.module.scss";
import { Category } from "../../types/category";

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const url = process.env.REACT_APP_API_URL + "/" + category.image;

  return (
    <Link to={`/${category.type}`} className={styles.card}>
      <h3 className={styles.card__title}>{category.name}</h3>
      <div className={styles.card__img}>
        <img src={url} alt={category.name} />
      </div>
    </Link>
  );
};

export default CategoryCard;
