import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardCheckbox from "../../components/common/form/cardCheckbox/cardCheckbox";
import { Spinner } from "../../components/ui/spinner/spinner";
import NotFound from "../../pages/404";
import { formatPrice } from "../../utils/formatPrice";
import { useGetProductQuery } from "../api/apiSlice";
import styles from "./product.module.scss";

const Product = () => {
  const { id } = useParams();
  if (!id) return null;

  const [values, setValues] = useState({
    color: ""
  });
  const {
    data: product,
    isLoading,
    isSuccess,
    isError
  } = useGetProductQuery(id);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  let content;

  if (isLoading) {
    content = content = (
      <div className={styles.loader}>
        <Spinner text="Loading" />
      </div>
    );
  } else if (isSuccess) {
    const img = process.env.REACT_APP_API_URL + "/" + product?.imagePaths[0];
    content = (
      <>
        <div>Ноутбуки &gt; Apple</div>
        <div className={styles.wrapper}>
          <div className={styles.main_image}>
            <img src={img} alt={product.name} />
          </div>
          <div className={styles.configuration}>
            <ul>
              <li className={styles.configuration__item}>
                <h4 className={styles.configuration__title}>Цвет</h4>
                <div className={styles.configuration__options}>
                  <CardCheckbox
                    value={values.color}
                    label="Серебристый"
                    name="color"
                    onChange={handleChange}
                  />
                  <CardCheckbox
                    value={values.color}
                    label="Серый космос"
                    name="color"
                    onChange={handleChange}
                  />
                </div>
              </li>
              <li>
                <h4 className={styles.configuration__title}>Память</h4>
                <div className={styles.configuration__options}>
                  <CardCheckbox
                    value={values.color}
                    label="512GB"
                    name="color"
                    onChange={handleChange}
                  />
                  <CardCheckbox
                    value={values.color}
                    label="1TB"
                    name="color"
                    onChange={handleChange}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.reviews}>
              <span>
                <FontAwesomeIcon icon={faStar} />
                4.9
              </span>{" "}
              <span>20 отзывов</span>{" "}
            </p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <div className={styles.benefits}>
              <span className={styles.badge}>Бонусы</span>
              <span className={styles.badge}>Бесплатная доставка</span>
              <span className={styles.badge}>Доставка завтра</span>
            </div>
            <button className={styles.btn}>
              <span className={styles.btn__icon}>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span>Добавить в корзину</span>
            </button>
            <button className={`${styles.btn} ${styles.btn_active}`}>
              <span className={styles.btn__icon}>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span>Добавить в корзину</span>
            </button>
            <button className={styles.bookmark}>
              <span className={styles.btn__icon}>
                <FontAwesomeIcon icon={faBookmark} />
              </span>
              Посмотреть позже
            </button>
            <p>Доставка 5-7 дней</p>
          </div>
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default Product;
