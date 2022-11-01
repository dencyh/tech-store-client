import React from "react";
import styles from "./search.module.scss";
import SearchButton from "../ui/searchButton";

const Search = ({ categories = [] }) => {
  return (
    <form className={styles.search}>
      <input type="text" className={styles.input} />
      <SearchButton />
    </form>
  );
};

export default Search;
