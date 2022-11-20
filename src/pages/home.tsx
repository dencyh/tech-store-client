import React from "react";
import Logo from "../components/ui/logo/logo";
import Navbar from "../components/ui/navbar";
import Categories from "../features/categories/categories";
import Layout from "./layout";

const Home = () => {
  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

export default Home;
