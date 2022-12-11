import { omit } from "lodash";
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

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

  const { data: specsData = {} as SpecsVariants } = useGetSpecsQuery(type);
  const specs = useMemo(() => {
    if (!specsData?._id) return {} as FlatSpecs;

    const flatObj = flattenObject(omit(specsData, ["_id"]));

    return flatObj;
  }, [specsData]);

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      console.log(name, value, "dispatch");
      console.log(value);
      dispatch(toggleFilters({ [name]: value }));
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
