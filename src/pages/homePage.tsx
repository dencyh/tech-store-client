import React from "react";
import Categories from "../features/categories";
import ProductCompact from "../features/products/productMin";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery
} from "../features/products/productSlice";
import Slider from "../features/carousel/carousel";
import { useAppSelector } from "../redux/hooks";
import Layout from "./layout";
import HeroImage from "../assets/img/home/cart.webp";
import styles from "./pages.module.scss";

const HomePage = () => {
  useGetCategoryProductsQuery();
  const products = useAppSelector(getProductsSelectors().selectAllProducts);

  let sliderItems = products.map((product) => (
    <ProductCompact key={product._id} product={product} />
  ));

  return (
    <Layout>
      <Categories />
      <div className={styles.hero_block}>
        <h2 className={styles.hero_title}>
          -10% при регистрации на первый заказ:{" "}
          <span className={styles.title_accent}>BTS10</span>
        </h2>
        <img src={HeroImage} className={styles.hero_img} />
      </div>
      <Slider title="Новинки">{sliderItems}</Slider>
      <Slider title="Рекомендации">{sliderItems}</Slider>
      <Slider title="Скидки">{sliderItems}</Slider>
    </Layout>
  );
};

export default HomePage;
