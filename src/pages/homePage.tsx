import React from "react";
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
  useGetCategoryProductsQuery();
  const products = useAppSelector(getProductsSelectors().selectAllProducts);
  console.log(products);

  let sliderItems = products.map((product) => (
    <ProductCompact key={product._id} product={product} />
  ));

  return (
    <Layout>
      <Categories />
      <Slider title="Новинки">{sliderItems}</Slider>
      <Slider title="Рекомендации">{sliderItems}</Slider>
      <Slider title="Скидки">{sliderItems}</Slider>
    </Layout>
  );
};

export default HomePage;
