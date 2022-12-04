import React from "react";
import Logo from "../../components/ui/logo/logo";
import Search from "../../components/common/search/index";
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
