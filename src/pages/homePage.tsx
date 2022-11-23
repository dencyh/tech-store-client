import React from "react";
import Logo from "../components/ui/logo/logo";
import Navbar from "../components/ui/navbar";
import Categories from "../features/categories";
import Layout from "./layout";

const HomePage = () => {
  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

export default HomePage;
