import React from "react";
import Logo from "../components/ui/logo/logo";
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
