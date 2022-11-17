import React from "react";
import { Link } from "react-router-dom";
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <Link to={"/"} className={styles.logo}>
      BT
    </Link>
  );
};

export default Logo;
