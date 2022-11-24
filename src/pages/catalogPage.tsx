import React from "react";
import Products from "../features/catalog/index";
import Layout from "./layout";

const CatalogPage = () => {
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default CatalogPage;
