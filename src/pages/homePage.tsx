import React, { useEffect } from "react";
import Logo from "../components/ui/logo/logo";
import CatalogList from "../features/catalog/catalogList";
import Categories from "../features/categories";
import ProductCompact from "../features/products/productMin";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery
} from "../features/products/productSlice";
import Slider from "../features/slider/slider";
import { useAppSelector } from "../redux/hooks";
import Layout from "./layout";

const HomePage = () => {
  const { data } = useGetCategoryProductsQuery();
  const products = useAppSelector(getProductsSelectors().selectAllProducts);
  console.log(products);

  let sliderItems = products.map((product) => (
    <ProductCompact key={product._id} product={product} />
  ));

  return (
    <Layout>
      <Categories />
      <Slider title="Популярное">{sliderItems}</Slider>
    </Layout>
  );
};

export default HomePage;
