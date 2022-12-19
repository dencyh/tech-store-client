import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./itemPlaceholder.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import BookmarkButton from "../../components/ui/bookmarkButton/bookmarkButton";
import AddToCartButton from "../../components/ui/addToCartButton/addToCartButton";
import PlaceholderImg from "../../assets/img/placeholder-camera-sm.png";

const ItemPlaceholder = () => {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={PlaceholderImg} alt="placeholder" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}></h3>
        <div className={styles.reviews}>
          <div className={styles.reviews__rating}></div>{" "}
          <div className={styles.reviews__count}></div>{" "}
        </div>

        <ul className={styles.features}>
          <li className={styles.feature}>
            <span>Экран:</span>
            <span>{123}&quot;</span>
            <span>2500x1250</span>
            <span>{120}HZ</span>
          </li>
          <li className={styles.feature}>
            <span>Процессор:</span>
            <span>M2 chip</span>
            <span>{8} CPU Cores</span>
          </li>
          <li className={styles.feature}>
            <span>Память:</span>
            <span>{16} GB RAM</span>
            <span>512 GB</span>
          </li>
          <li className={styles.feature}>
            <span>Видеокарта:</span>
            <span>8 core GPU</span>
          </li>
        </ul>

        <div className={styles.benefits}>
          <span className={styles.badge}>Бонусы</span>
          <span className={styles.badge}>Бесплатная доставка</span>
          <span className={styles.badge}>Доставка завтра</span>
        </div>
      </div>

      <div className={styles.pricebox}>
        <div className={styles.price}>
          <p>99 000 Р</p>
          <p>100 000 Р</p>
        </div>

        <AddToCartButton
          onAdd={function (): void {
            throw new Error("Function not implemented.");
          }}
          inCart={false}
        />

        <BookmarkButton
          inBookmarks={false}
          onAdd={function (): void {
            throw new Error("Function not implemented.");
          }}
          onRemove={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* <div className={styles.additional_info}> */}
        {/* <p>В наличии</p> */}
        {/* <p>Доставка 5-7 дней</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ItemPlaceholder;
