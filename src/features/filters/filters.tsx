import { isArray } from "lodash";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "../../components/common/form/checkbox";
import Input from "../../components/common/form/input/input";
import { useAppSelector } from "../../redux/hooks";
import { formatSpecs } from "../../utils/formatSpecs";
import { translate } from "../../utils/translate";
import { getProductsSelectors } from "../products/productSlice";
import FilterItem from "./filterItem";
import styles from "./filters.module.scss";
import { SpecsVariants, useGetSpecsQuery } from "./filtersSlice";

const initState = {};

const Filters = () => {
  const { type } = useParams();
  if (!type) return null;

  const [value, setValue] = useState({});

  const { data: specsData = {} as SpecsVariants } = useGetSpecsQuery(type);
  const specs = useMemo(() => {
    if (!specsData?._id) return null;
    const { _id, specs, ...rest } = specsData;

    const flatObj = { ...rest, ...specs };
    const output: any = {};

    let key: keyof typeof flatObj;
    for (key in flatObj) {
      output[key] = flatObj[key].slice(0).sort((a, b) => {
        if (typeof a === "string" && typeof b === "string") {
          return a.localeCompare(b);
        } else if (isArray(a) && isArray(b)) {
          return a[0] - b[0];
        } else if (typeof a === "number" && typeof b === "number") {
          return a - b;
        } else {
          console.log("something else");
          return -1;
        }
        // console.log(test);
        // return 1;
      });
    }

    console.log(output);

    return flatObj;
  }, [specsData]);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    console.log(value);
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const filters = useAppSelector((state) => state.filters.filters);
  const products = useAppSelector(
    getProductsSelectors(filters).selectAllProducts
  );

  const [values, setValues] = useState({});

  return (
    <aside className={styles.filters}>
      <div className={styles.filter_item}></div>
      {specs &&
        Object.keys(specs).map((key) => {
          return (
            <div key={key} className={styles.filter_item}>
              <p className={styles.title}>{translate("specs", key)}</p>

              <ul>
                {specs[key as keyof typeof specs].map((variant) => (
                  <li key={variant.toString()} className={styles.variant}>
                    <Checkbox
                      name="brand"
                      value={""}
                      label={formatSpecs(variant, key)}
                      onChange={handleChange}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
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

      <div className={styles.filter_item}>
        <p className={styles.title}>Бренд</p>
        <ul>
          <li>
            <Checkbox
              name="brand"
              value={""}
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
