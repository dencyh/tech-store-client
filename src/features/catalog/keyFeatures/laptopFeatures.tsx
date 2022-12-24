import React from "react";
import { Laptop } from "../../../types/products/laptop";
import styles from "../catalog.module.scss";

interface Props {
  product: Laptop;
}
const LaptopFeatures: React.FC<Props> = ({ product }) => {
  const { specs } = product;
  const {
    screenSize,
    resolution,
    refreshRate,
    cpu,
    cpuCores,
    ram,
    capacity,
    gpu
  } = specs;

  return (
    <ul className={styles.features}>
      <li className={styles.feature}>
        <span>Экран:</span>
        <span>{screenSize}&quot;</span>
        <span>
          {resolution[0]}x{resolution[1]}
        </span>
        <span>{refreshRate}HZ</span>
      </li>
      <li className={styles.feature}>
        <span>Процессор:</span>
        <span>{cpu}</span>
        <span>{cpuCores} CPU Cores</span>
      </li>
      <li className={styles.feature}>
        <span>Память:</span>
        <span>{ram} GB RAM</span>
        <span>
          {capacity < 999 ? capacity + "GB" : capacity / 1000 + "TB"} SSD
        </span>
      </li>
      <li className={styles.feature}>
        <span>Видеокарта:</span>
        <span>{gpu}</span>
      </li>
    </ul>
  );
};
export default LaptopFeatures;
