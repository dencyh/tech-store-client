import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./catalog.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../../types/products/core.product";
import { formatPrice } from "../../utils/formatPrice";

function showKeyFeatures(product: Product) {
  switch (product.type) {
    case "laptops": {
      const { specs } = product;
      const {
        screenSize,
        resolution,
        refreshRate,
        cpu,
        cpuCores,
        ram,
        capacity,
        gpu
      } = specs;
      return (
        <ul className={styles.features}>
          <li className={styles.feature}>
            <span>Экран:</span>
            <span>{screenSize}&quot;</span>
            <span>
              {resolution[0]}x{resolution[1]}
            </span>
            <span>{refreshRate}HZ</span>
          </li>
          <li className={styles.feature}>
            <span>Процессор:</span>
            <span>{cpu}</span>
            <span>{cpuCores} CPU Cores</span>
          </li>
          <li className={styles.feature}>
            <span>Память:</span>
            <span>{ram} GB RAM</span>
            <span>
              {capacity < 999 ? capacity + "GB" : capacity / 1000 + "TB"} SSD
            </span>
          </li>
          <li className={styles.feature}>
            <span>Видеокарта:</span>
            <span>{gpu}</span>
          </li>
        </ul>
      );
    }
  }
}

interface Props {
  product: Product;
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  const image = product.imagePaths ? product.imagePaths[0] : "";

  const url = process.env.REACT_APP_API_URL + "/" + image;

  const productLink =
    "/products" +
    "/" +
    product.name.toLowerCase().split(" ").join("-") +
    "/" +
    product._id;

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={url} alt={product.name} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>
          <Link className={styles.link} to={productLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.reviews}>
          <span>
            <FontAwesomeIcon icon={faStar} />
            4.9
          </span>{" "}
          <span>20 отзывов</span>{" "}
        </p>
        {/* <p className={styles.features__title}>Характеристики</p> */}
        {showKeyFeatures(product)}
        <div className={styles.benefits}>
          <span className={styles.badge}>Бонусы</span>
          <span className={styles.badge}>Бесплатная доставка</span>
          <span className={styles.badge}>Доставка завтра</span>
        </div>
      </div>

      <div className={styles.pricebox}>
        <div className={styles.price}>
          <p className={styles.price_new}>{formatPrice(product.price)}</p>
          <p className={styles.price_old}>
            {formatPrice(product.price + 10000)}
          </p>
        </div>
        <button className={styles.btn}>
          <span className={styles.btn__icon}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
          <span>В корзину</span>
        </button>
        <button className={styles.bookmark}>
          <span className={styles.btn__icon}>
            <FontAwesomeIcon icon={faBookmark} />
          </span>
          Добавить в израбнное
        </button>
        <div>
          <p>В наличии</p>
          <p>Доставка 5-7 дней</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
