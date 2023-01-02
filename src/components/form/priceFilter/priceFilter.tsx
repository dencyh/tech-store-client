import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";

import { formatPrice } from "../../../utils/formatPrice";
import styles from "./priceFilter.module.scss";

interface Props {
  title: string;
  range: number[];
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

const PriceFilter: React.FC<Props> = ({ title, range, onChange }) => {
  const init = () => ({
    min: 0,
    max: range[range.length - 1]
  });

  const [values, setValues] = useState(init);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value)
    }));
  };

  const passValues = useCallback(
    () => [values.min || init().min, values.max || init().max],
    [values]
  );

  const { debounced } = useDebounce(passValues, 600);

  useEffect(() => {
    onChange({ name: "price", value: JSON.stringify(debounced) });
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
