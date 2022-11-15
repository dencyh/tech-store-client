import React, { useEffect } from "react";
import CategoryCard from "./categoryCard";
import _ from "lodash";
import styles from "./categories.module.scss";
import { getCategories } from "../../../redux/categoriesState";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Categories = () => {
  const dispath = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  console.log(categories);

  useEffect(() => {
    dispath(getCategories());
  }, [dispath]);

  const arr = _.range(0, 12);
  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
