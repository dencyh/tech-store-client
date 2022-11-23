import React from "react";
import { useParams } from "react-router-dom";
import Filters from "../features/filters";
import Products from "../features/products";
import ProductList from "../features/products/productList";
import Layout from "./layout";

const ProductPage = () => {
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default ProductPage;
