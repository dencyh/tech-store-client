import React, { useEffect, useState } from "react";
import styles from "./search.module.scss";
import SearchButton from "../../components/buttons/searchButton";
import useDebounce from "../../hooks/useDebounce";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFilters } from "../filters/filtersSlice";

const Search = () => {
  const { type = "" } = useParams();
  const [query, setQuery] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { debounced } = useDebounce(query, 600);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilters({ type, search: debounced }));
  }, [debounced]);

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
