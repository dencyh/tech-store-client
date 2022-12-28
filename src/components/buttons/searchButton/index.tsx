import React from "react";
import styles from "./searchButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchButton = () => {
  return (
    <button className={styles.button} aria-label="search">
      <FontAwesomeIcon className={styles.icon} icon={faSearch} />
    </button>
  );
};

export default SearchButton;
