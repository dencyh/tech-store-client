import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

import { formatPrice } from "../../utils/formatPrice";
import styles from "./priceFilter.module.scss";

interface Props {
  title: string;
  range: number[];
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

const PriceFilter: React.FC<Props> = ({ title, range, onChange }) => {
  const [values, setValues] = useState({
    min: 0,
    max: range[range.length - 1]
  });
  console.log(values);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]:
        Number(e.target.value) === 0
          ? range[range.length - 1]
          : Number(e.target.value)
    }));
  };

  const debounced = useDebounce(`${values.min},${values.max}`, 600);

  useEffect(() => {
    onChange({ name: "price", value: debounced });
  }, [debounced]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.input_container}>
        <label htmlFor="min">от</label>
        <input
          className={styles.input}
          id="min"
          name="min"
          type="number"
          placeholder={formatPrice(range[0])}
          onChange={handleChange}
          max={values.max}
        />
        <label htmlFor="max">до</label>
        <input
          className={styles.input}
          id="max"
          name="max"
          type="number"
          placeholder={formatPrice(range[range.length - 1])}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
export default PriceFilter;
