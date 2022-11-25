import React, { useState } from "react";
import Checkbox from "../../components/common/form/checkbox";
import TextInput from "../../components/common/form/textInput/textInput";
import styles from "./filters.module.scss";

const Filters = () => {
  const [value, setValue] = useState({
    brand: ""
  });

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className={styles.filters}>
      <div className={styles.filter_item}>
        <p className={styles.title}>Цена</p>
        <div className={styles.input_contaier}>
          <label htmlFor="min">от</label>
          <input
            className={styles.input}
            id="min"
            type="text"
            placeholder="мин."
          />
          <label htmlFor="max">до</label>
          <input
            className={styles.input}
            id="max"
            type="text"
            placeholder="макс."
          />
        </div>
      </div>

      <div className={styles.filter_item}>
        <p className={styles.title}>Бренд</p>
        <ul>
          <li>
            <Checkbox
              name="brand"
              value={value.brand}
              label="Apple"
              onChange={handleChange}
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
