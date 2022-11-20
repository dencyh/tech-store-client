import React, { useEffect } from "react";
import CategoryCard from "./categoryCard";
import _ from "lodash";
import styles from "./categories.module.scss";

import { useGetCategoriesQuery } from "../api/apiSlice";
import { Category } from "../../types/category";

const Categories = () => {
  const { data: categories } = useGetCategoriesQuery(undefined);

  if (!categories) return <div>Loading...</div>;
  return (
    <div className={styles.wrapper}>
      <div className={styles.categories}>
        {categories.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
