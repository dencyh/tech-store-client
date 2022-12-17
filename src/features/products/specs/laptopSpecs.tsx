import { omit } from "lodash";
import React, { useMemo } from "react";
import { Laptop } from "../../../types/products/laptop";
import { flattenObject } from "../../../utils/flattenObject";
import { formatSpecs } from "../../../utils/formatSpecs";
import { translate } from "../../../utils/translate";
import styles from "./specs.module.scss";

const omitKeys = [
  "name",
  "_id",
  "type",
  "description",
  "price",
  "category",
  "brand",
  "imagePaths",
  "createdAt",
  "updatedAt",
  "__v"
];

interface Props {
  product: Laptop;
}
const LaptopSpecs: React.FC<Props> = ({ product }) => {
  const productSpecs = useMemo(() => {
    const flatObj = flattenObject(omit(product, omitKeys));
    return flatObj;
  }, [product]);

  return (
    <table className={styles.table}>
      <tbody className={styles.table_zebra}>
        {Object.keys(productSpecs).map((key) => (
          <tr key={key} className={styles.tr}>
            <td>{translate("specs", key)}</td>
            <td>{formatSpecs(productSpecs[key], key)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default LaptopSpecs;
