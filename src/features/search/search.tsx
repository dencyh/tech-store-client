import React, { useEffect, useState } from "react";
import styles from "./search.module.scss";
import SearchButton from "../../components/ui/searchButton";
import useDebounce from "../../hooks/useDebounce";
import { useGetCategoryProductsQuery } from "../products/productSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addFilter } from "../filters/filtersSlice";

const Search = () => {
  const { type } = useParams();
  if (!type) return null;
  const [query, setQuery] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debounced = useDebounce(query, 600);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addFilter({ type, name: debounced }));
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
