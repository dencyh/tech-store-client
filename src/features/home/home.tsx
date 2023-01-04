import React from "react";
import { useAppSelector } from "../../redux/hooks";
import Carousel from "../carousel/carousel";
import Categories from "../categories";
import ProductMin from "../products/productMin";
import {
  useGetCategoryProductsQuery,
  getProductsSelectors
} from "../products/productSlice";
import styles from "./home.module.scss";
import HeroImage from "../../assets/img/home/cart_purple.webp";
import HeroImage2 from "../../assets/img/home/cart_yellow.webp";
import PlaceholderProductMin from "../products/placeholderProductMin";

const dummyProducts = Array(8).fill(0);

const Home = () => {
  const { isSuccess } = useGetCategoryProductsQuery();
  const products = useAppSelector(getProductsSelectors().selectAllProducts);

  let carouselItems = dummyProducts.map((_, i) => (
    <PlaceholderProductMin key={i} />
  ));
  if (isSuccess) {
    carouselItems = products.map((product) => (
      <ProductMin key={product._id} product={product} />
    ));
  }

  const carouselImages = [
    <div key={1} className={styles.promo}>
      <h2 className={styles.promo_title}>
        -10% при регистрации на первый заказ:{" "}
        <span className={styles.title_accent}>BTS</span>
      </h2>
      <img className={styles.promo_img} src={HeroImage} alt="promo" />
    </div>,
    <div key={2} className={styles.promo}>
      <h2 className={styles.promo_title}>
        <span className={styles.title_accent}>Скидка 500 рублей</span> за
        установку мобильного приложения
      </h2>
      <img className={styles.promo_img} src={HeroImage2} alt="promo" />
    </div>
  ];

  return (
    <>
      <div className={styles.hero_block}>
        <Carousel fullWidth>{carouselImages}</Carousel>
      </div>
      <Categories />
      <Carousel title="Новинки">{carouselItems}</Carousel>
      <Carousel title="Рекомендации">{carouselItems}</Carousel>
      <Carousel title="Скидки">{carouselItems}</Carousel>
    </>
  );
};
export default Home;
