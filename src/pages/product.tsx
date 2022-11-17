import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./layout";

const Product = () => {
  const { id } = useParams();
  console.log(id);

  // get product

  // if product doesn't exist go to not found page

  return (
    <Layout>
      <div>Product</div>
    </Layout>
  );
};

export default Product;
