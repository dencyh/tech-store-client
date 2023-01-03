import React from "react";
import Categories from "../features/categories";
import ProductCompact from "../features/products/productMin";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery
} from "../features/products/productSlice";
import Carousel from "../features/carousel/carousel";
import { useAppSelector } from "../redux/hooks";
import Layout from "./layout";
import HeroImage from "../assets/img/home/cart.webp";
import HeroImage2 from "../assets/img/home/cart_yellow.webp";
import styles from "./pages.module.scss";

const HomePage = () => {
  useGetCategoryProductsQuery();
  const products = useAppSelector(getProductsSelectors().selectAllProducts);

  let carouselItems = products.map((product) => (
    <ProductCompact key={product._id} product={product} />
  ));

  let carouselImages = Array(10)
    .fill(0)
    .map((item, index) => (
      <img
        key={index}
        className={styles.carousel_img}
        src={index % 2 === 0 ? HeroImage : HeroImage2}
      />
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
      <Carousel fullWidth title="Новинки">
        {carouselImages}
      </Carousel>
      <Carousel title="Новинки">{carouselItems}</Carousel>
      <Carousel title="Рекомендации">{carouselItems}</Carousel>
      <Carousel title="Скидки">{carouselItems}</Carousel>
    </Layout>
  );
};

export default HomePage;
