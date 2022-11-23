import React, { useState } from "react";
import styles from "./search.module.scss";
import SearchButton from "../../ui/searchButton";

const Search = ({ categories = [] }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className={styles.search}>
      <input
        type="text"
        className={styles.input}
        value={query}
        onChange={handleChange}
      />
      <SearchButton />
    </form>
  );
};

export default Search;
