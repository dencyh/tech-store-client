import React from "react";
import { Product } from "../../types/products/core.product";
import styles from "./slider.module.scss";

interface Props {
  children: JSX.Element[];
  title?: string;
  subtitle?: string;
}
const Slider: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <div className={styles.outer__container}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <div className={styles.container}>
        <ul className={styles.slider}>
          {children.map((child) => (
            <li className={styles.slider__item} key={child.key}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Slider;
