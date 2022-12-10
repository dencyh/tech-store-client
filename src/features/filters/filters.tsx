import { isArray } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import CollapsibleList from "../../components/collapsibleList/collapsibleList";
import Checkbox from "../../components/common/form/checkbox";
import PriceFilter from "../../components/priceFilter/priceFilter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formatSpecs } from "../../utils/formatSpecs";
import { translate } from "../../utils/translate";
import styles from "./filters.module.scss";
import {
  addFilters,
  setFilters,
  SpecsVariants,
  useGetSpecsQuery
} from "./filtersSlice";

const initState = {};

type FlatSpecs = Omit<SpecsVariants, "specs"> & SpecsVariants["specs"];

const Filters = () => {
  const { type } = useParams();
  if (!type) return null;

  const { data: specsData = {} as SpecsVariants } = useGetSpecsQuery(type);
  const specs = useMemo(() => {
    if (!specsData?._id) return {} as FlatSpecs;
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
      });
    }

    return flatObj;
  }, [specsData]);

  const [values, setValues] = useState<{} | typeof specs>({});
  console.log(values);

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string; checked: boolean }) => {
      dispatch(addFilters({ name: ["Macbook Air M1", "asus"] }));
      if (!values[name as keyof typeof values]) {
        setValues((prev) => {
          return { ...prev, [name]: [value] };
        });
      } else {
        setValues((prev) => {
          return {
            ...prev,
            [name]: [...prev[name as keyof typeof values], value]
          };
        });
      }
      // setValues((prev) => {
      //   return { ...prev, [name]: [value] };
      // });
    },
    []
  );

  const filters = useAppSelector((state) => state.filters.filters);

  const dispatch = useAppDispatch();

  return (
    <aside className={styles.filters}>
      <div className={styles.filter_item}></div>
      {Object.keys(specs).length > 0 &&
        Object.keys(specs).map((key) =>
          key === "price" ? (
            <PriceFilter
              key={key}
              values={specs[key]}
              title={translate("specs", key)}
            />
          ) : (
            <CollapsibleList key={key} title={translate("specs", key)}>
              {specs[key as keyof typeof specs].map((variant: any) => (
                <li key={variant.toString()} className={styles.variant}>
                  <Checkbox
                    name={key}
                    value={variant.toString()}
                    label={formatSpecs(variant, key)}
                    onChange={handleChange}
                  />
                </li>
              ))}
            </CollapsibleList>
          )
        )}
    </aside>
  );
};

export default Filters;
