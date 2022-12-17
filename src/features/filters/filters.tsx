import { isArray, omit } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import CollapsibleList from "../../components/collapsibleList/collapsibleList";
import Checkbox from "../../components/common/form/checkbox";
import PriceFilter from "../../components/priceFilter/priceFilter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { flattenObject } from "../../utils/flattenObject";
import { formatSpecs } from "../../utils/formatSpecs";
import { translate } from "../../utils/translate";
import styles from "./filters.module.scss";
import { SpecsVariants, toggleFilters, useGetSpecsQuery } from "./filtersSlice";

type FlatSpecs = Omit<SpecsVariants, "specs"> & SpecsVariants["specs"];

const Filters = () => {
  const { type } = useParams();
  if (!type) return null;

  let [searchParams, setSearchParams] = useSearchParams();

  const { data: specsData = {} as SpecsVariants } = useGetSpecsQuery(type);

  const specs = useMemo(() => {
    if (!specsData?._id) return {} as FlatSpecs;
    const flatObj = flattenObject(omit(specsData, ["_id"]));
    for (const key in flatObj) {
      flatObj[key] = flatObj[key].slice(0).sort((a: any, b: any) => {
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

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      // console.log(name, value, "dispatch");
      // console.log(value);
      dispatch(toggleFilters({ [name]: value }));
    },
    []
  );

  const filters = useAppSelector((state) => state.filters.filters);
  // useEffect(() => {
  //   setSearchParams(filters);
  // }, [filters]);

  const dispatch = useAppDispatch();

  return (
    <aside className={styles.filters}>
      <div className={styles.filter_item}></div>
      {Object.keys(specs).length > 0 &&
        Object.keys(specs).map((key) =>
          key === "price" ? (
            <PriceFilter
              key={key}
              range={specs[key] as number[]}
              title={translate("specs", key)}
              onChange={handleChange}
            />
          ) : (
            <CollapsibleList key={key} title={translate("specs", key)}>
              {specs[key as keyof typeof specs].map((variant: any) => (
                <li key={variant.toString()} className={styles.variant}>
                  <Checkbox
                    name={key}
                    value={JSON.stringify(variant)}
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
