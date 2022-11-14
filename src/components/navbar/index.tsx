import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import Search from "../search/index";
import styles from "./navbar.module.scss";
import NavItems from "./navItems";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__inner}>
        <Logo />
        <Search />
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
