import React from "react";
import CategoryCard from "./categoryCard";
import _ from "lodash";
import styles from "./categories.module.scss";

const Categories = () => {
  const arr = _.range(0, 12);
  return (
    <div className={styles.categories}>
      {arr.map((item, index) => (
        <CategoryCard key={index} />
      ))}
    </div>
  );
};

export default Categories;
