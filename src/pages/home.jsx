import React from "react";
import Logo from "../components/logo/logo";
import Navbar from "../components/navbar";
import Categories from "../features/categories";
import Layout from "./layout";

const Home = () => {
  return (
    <Layout>
      <Categories />
    </Layout>
  );
};

export default Home;
