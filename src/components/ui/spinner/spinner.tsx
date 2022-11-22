import React from "react";
import styles from "./spinner.module.scss";

interface Props {
  text?: string;
}

export const Spinner: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.linespinner}></div>
      <h3>{text}</h3>
    </div>
  );
};
