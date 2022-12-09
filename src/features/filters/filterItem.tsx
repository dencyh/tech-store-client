import React from "react";
import Checkbox from "../../components/common/form/checkbox";
import { formatSpecs } from "../../utils/formatSpecs";
import { translate } from "../../utils/translate";
import styles from "./filters.module.scss";

interface Props {
  name: string;
  variant: any;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}
const FilterItem: React.FC<Props> = ({ name, variant, onChange }) => {
  let item;

  switch (name) {
    case "price":
      return (
        <li>
          <div className={styles.filter_item}>
            <p className={styles.title}>Цена</p>
            <div className={styles.input_container}>
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
        </li>
      );
    default:
      return (
        <li key={variant.toString()} className={styles.variant}>
          <Checkbox
            name="brand"
            value={""}
            // label={specToString(variant, name)}
            onChange={onChange}
          />
        </li>
      );
  }
};
export default FilterItem;
