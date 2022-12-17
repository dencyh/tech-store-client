import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardCheckbox from "../../components/common/form/cardCheckbox/cardCheckbox";
import { Spinner } from "../../components/ui/spinner/spinner";
import NotFound from "../../pages/404";
import { useAppSelector } from "../../redux/hooks";
import { getConfigOptions } from "../../utils/findDiff";
import { formatPrice } from "../../utils/formatPrice";
import Reviews from "../reviews/reviews";
import styles from "./product.module.scss";
import {
  getProductsSelectors,
  useGetCategoryProductsQuery,
  useGetProductQuery
} from "./productSlice";
import SpecVariant from "./configOption";
import ConfigOption from "./configOption";
import { configKeys } from "../../utils/configKeys";
import Config from "./config";
import Benefits from "./benefits";
import imgPlaceholder from "../../assets/img/placeholder-camera-sm.png";

const baseImageUrl = process.env.REACT_APP_API_URL + "/";

const Product = () => {
  const { id } = useParams();
  if (!id) return null;

  const [values, setValues] = useState({
    color: ""
  });
  const { data: product, isLoading, isSuccess } = useGetProductQuery(id);
  useGetCategoryProductsQuery(
    { name: product?.name || "" },
    {
      skip: !product
    }
  );
  const variants = useAppSelector(
    getProductsSelectors({
      name: product?.name || ""
    }).selectAllProducts
  );
  const config = getConfigOptions(
    variants,
    configKeys[product?.type || "default"]
  );

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const [currentImage, setCurrentImage] = useState(imgPlaceholder);

  useEffect(() => {
    if (product) {
      setCurrentImage(baseImageUrl + product?.imagePaths[0]);
    }
  }, [product]);

  const handleImageSelect = (path: string) => {
    setCurrentImage(path + ".png");
  };

  let content;

  if (isLoading) {
    content = content = (
      <div className={styles.loader}>
        <Spinner text="Loading" />
      </div>
    );
  } else if (isSuccess) {
    // const img = baseImageUrl + product.imagePaths[0];

    const minRegExp = /.+(?=(.png$))/;
    const minImages = product.imagePaths.map((img) => {
      return baseImageUrl + img.match(minRegExp)?.[0];
    });

    content = (
      <>
        {/* <div>Ноутбуки &gt; Apple</div> */}
        <div className={styles.inner_wrapper}>
          <div className={styles.side_image_container}>
            {minImages.map((img) => (
              <div
                className={`${styles.side_image} ${
                  currentImage.includes(img) ? styles.active : ""
                }`}
                key={img}
                aria-label="image-select"
                onClick={() => handleImageSelect(img)}
              >
                <img src={img + ".min.png"} alt="gallery-image" />
              </div>
            ))}
          </div>
          <div className={styles.main_image}>
            <img src={currentImage} alt={product.name} />
          </div>
          <div className={styles.configuration}>
            <Config config={config} />
            <div>
              <h3>Характеристики</h3>
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.reviews}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className={styles.reviews__star}
                />{" "}
                <span>4.9</span>
              </span>{" "}
              <span className={styles.reviews__count}>20 отзывов</span>{" "}
            </p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <Benefits />
            <button className={styles.btn}>
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
        <Reviews />
      </>
    );
  }

  return <div>{content}</div>;
};

export default Product;
