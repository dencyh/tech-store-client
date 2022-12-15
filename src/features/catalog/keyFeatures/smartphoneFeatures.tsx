import React from "react";
import { Smartphone } from "../../../types/products/smartphone";
import styles from "../catalog.module.scss";

interface Props {
  product: Smartphone;
}
const SmartphoneFeatures: React.FC<Props> = ({ product }) => {
  const { specs } = product;
  const {
    screenSize,
    resolution,
    refreshRate,
    cpu,
    ram,
    capacity,
    batteryLife
  } = specs;

  return (
    <ul className={styles.features}>
      <li className={styles.feature}>
        <span>Экран:</span>
        <span>{screenSize}&quot;</span>
        <span>
          {resolution[0]}x{resolution[1]}
        </span>
        <span>{refreshRate} Гц</span>
      </li>
      <li className={styles.feature}>
        <span>Процессор:</span>
        <span>{cpu},</span>
        <span>{ram} ГБ оперативной памяти</span>
      </li>
      <li className={styles.feature}>
        <span>Объем внутренней памяти:</span>
        <span>
          {capacity < 999 ? capacity + " ГБ" : capacity / 1000 + " ТБ"}
        </span>
      </li>
      <li className={styles.feature}>
        <span>Время автономной работы:</span>
        <span>{batteryLife} ч</span>
      </li>
    </ul>
  );
};
export default SmartphoneFeatures;
