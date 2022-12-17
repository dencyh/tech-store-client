import React from "react";
import styles from "./product.module.scss";

const Benefits = () => {
  return (
    <div className={styles.benefits}>
      <span className={styles.badge}>Бонусы</span>
      <span className={styles.badge}>Бесплатная доставка</span>
      <span className={styles.badge}>Доставка завтра</span>
    </div>
  );
};
export default Benefits;
