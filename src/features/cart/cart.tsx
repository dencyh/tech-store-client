import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import TextInput from "../../components/common/form/textInput/textInput";
import Layout from "../../pages/layout";
import styles from "./cart.module.scss";

interface Props {}

const Cart: React.FC<Props> = () => {
  const [value, setValue] = useState(1);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.products}>
          <ul className={styles.products__list}>
            <li className={styles.list__item}>
              <div className={styles.img}>
                <img
                  src="http://localhost:8080/static/product/f060faad-64fc-4f6c-9fe8-7c16a452eb84.png"
                  alt=""
                />
              </div>
              <div className={styles.info__container}>
                <div>
                  <h3 className={styles.product__title}>
                    Apple 16.2&quot; MacBook Pro with M1 Max Chip
                  </h3>
                  <p className={styles.availability}>В наличии</p>
                  <div className={styles.product__controls}>
                    <button className={styles.product__btn}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={styles.product__icon}
                      />
                      Посмотреть позже
                    </button>
                    <button className={styles.product__btn}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.product__icon}
                      />
                      Удалить
                    </button>
                  </div>
                </div>
                <div className={styles.price}>
                  <div className={styles.price__info}>
                    <div className={styles.quantity}>
                      <button className={styles.quantity__btn}>−</button>
                      <div>{value}</div>
                      <button className={styles.quantity__btn}>+</button>
                    </div>
                    <p className={styles.price__signle}>120 000 Р</p>
                  </div>
                  <div className={styles.product__total}>
                    <p>Итог:</p>
                    <p>240 000 P</p>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.list__item}>
              <div className={styles.img}>
                <img
                  src="http://localhost:8080/static/category/48200e6c-6655-4a6d-b125-0b9ee75e64c9.png"
                  alt=""
                />
              </div>
              <div className={styles.info__container}>
                <div>
                  <h3 className={styles.product__title}>
                    Apple 16.2&quot; MacBook Pro with M1 Max Chip
                  </h3>
                  <p className={styles.availability}>В наличии</p>
                  <div className={styles.product__controls}>
                    <button className={styles.product__btn}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={styles.product__icon}
                      />
                      Посмотреть позже
                    </button>
                    <button className={styles.product__btn}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.product__icon}
                      />
                      Удалить
                    </button>
                  </div>
                </div>
                <div className={styles.price}>
                  <div className={styles.price__info}>
                    <div className={styles.quantity}>
                      <button className={styles.quantity__btn}>−</button>
                      <div>{value}</div>
                      <button className={styles.quantity__btn}>+</button>
                    </div>
                    <p className={styles.price__signle}>120 000 Р</p>
                  </div>
                  <div className={styles.product__total}>
                    <p>Итог:</p>
                    <p>240 000 P</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.payment}>
          <h2 className={styles.payment__title}>Итого</h2>
          <ul className={styles.payment__table}>
            <li className={styles.subtotal}>
              <p>Всего за товары</p>
              <p>360000</p>
            </li>
            <li className={styles.subtotal}>
              <p>Скидка</p>
              <p>20000</p>
            </li>
            <li className={styles.subtotal}>
              <p>Доставка</p>
              <p>Бесплатно</p>
            </li>
            <li className={styles.total}>
              <p>Всего к оплате</p>
              <p>340 000 P</p>
            </li>
          </ul>
          <button className={styles.payment__btn}>Перейти к оформлению</button>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
