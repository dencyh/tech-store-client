import React from "react";

import { formatPrice } from "../../utils/formatPrice";
import styles from "./priceFilter.module.scss";

interface Props {
  title: string;
  values: number[];
}

const PriceFilter: React.FC<Props> = ({ title, values }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.input_container}>
        <label htmlFor="min">от</label>
        <input
          className={styles.input}
          id="min"
          type="text"
          placeholder={formatPrice(values[0], true)}
        />
        <label htmlFor="max">до</label>
        <input
          className={styles.input}
          id="max"
          type="text"
          placeholder={formatPrice(values[values.length - 1], true)}
        />
      </div>
    </div>
  );
};
export default PriceFilter;
