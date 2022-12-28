import React from "react";
import CategoryCard from "./categoryCard";
import _ from "lodash";
import styles from "./categories.module.scss";

import { Category, useGetCategoriesQuery } from "../api/apiSlice";
import { Spinner } from "../../components/ui/spinner/spinner";
import Loader from "../../components/loader/loader";

export const Categories = () => {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCategoriesQuery(undefined);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className={styles.categories}>
        {categories!.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <div className={styles.wrapper}>{content}</div>;
};

export default Categories;
