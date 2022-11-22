import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../api/apiSlice";

const ProductList = () => {
  const { category } = useParams();
  const response = useGetProductsByCategoryQuery(category || "");
  console.log(response);

  return <div>ProductList</div>;
};

export default ProductList;
