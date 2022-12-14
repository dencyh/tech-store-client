import React, { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
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
import { configKeys } from "../../utils/configKeys";
import Config from "./config";
import Benefits from "./benefits";
import imgPlaceholder from "../../assets/img/placeholder-camera-sm.webp";
import Specs from "./specs";
import AddToCartButton from "../../components/buttons/addToCartButton/addToCartButton";
import BookmarkButton from "../../components/buttons/bookmarkButton/bookmarkButton";
import { useCart } from "../../hooks/useCart";
import QuantityButton from "../../components/buttons/quantityButton/quantityButton";
import { Product as ProductType } from "../../types/products/core.product";
import { useBookmark } from "../../hooks/useBookmark";
import Loader from "../../components/loader/loader";
import cn from "classnames";
import Accordion from "../../components/accordion/accordion";

const baseImageUrl = process.env.REACT_APP_API_URL + "/";

const Product = () => {
  const { id } = useParams();
  if (!id) return null;

  const { data: product, isLoading, isSuccess } = useGetProductQuery(id);

  const { cartProduct, updateQuantity } = useCart(
    product || ({} as ProductType)
  );

  const { handleBookmarks, inBookmarks } = useBookmark(
    product || ({} as ProductType)
  );

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

  const [currentImage, setCurrentImage] = useState(imgPlaceholder);

  useEffect(() => {
    if (product) {
      setCurrentImage(baseImageUrl + product?.imagePaths[0]);
    }
  }, [product]);

  const handleImageSelect = (path: string) => {
    setCurrentImage(path + ".webp");
  };

  let content;

  if (isLoading) {
    content = content = (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  } else if (isSuccess) {
    const minRegExp = /.+(?=(.webp$))/;
    const minImages = product.imagePaths.map((img) => {
      return baseImageUrl + img.match(minRegExp)?.[0];
    });

    content = (
      <>
        {/* <div>???????????????? &gt; Apple</div> */}
        <div className={styles.inner_wrapper}>
          <div className={styles.left_section}>
            <div className={styles.gallery_container}>
              <div className={styles.side_image_container}>
                {minImages.map((img) => (
                  <div
                    className={cn(
                      styles.side_image,
                      currentImage.includes(img) ? styles.active : ""
                    )}
                    key={img}
                    aria-label="image-select"
                    onClick={() => handleImageSelect(img)}
                  >
                    <img src={img + ".min.webp"} alt="gallery-image" />
                  </div>
                ))}
              </div>

              <div className={styles.main_image}>
                <img src={currentImage} alt={product.name} />
              </div>
            </div>
            <div className={styles.specs}>
              <Accordion
                items={[
                  ...(product.description
                    ? [
                        {
                          title: "????????????????",
                          children: product.description
                        }
                      ]
                    : []),
                  {
                    title: "????????????????????????????",
                    children: <Specs product={product} />
                  }
                ]}
                allowMultiple
              />
            </div>
          </div>

          <div className={styles.right_section}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.reviews}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  className={styles.reviews__star}
                />{" "}
                <span>4.9</span>
              </span>{" "}
              <span className={styles.reviews__count}>20 ??????????????</span>{" "}
            </p>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <Benefits />
            <div className={styles.btn_container}>
              {!cartProduct ? (
                <AddToCartButton
                  onAdd={updateQuantity("increment")}
                  inCart={false}
                />
              ) : (
                <div className={styles.btn__container}>
                  <QuantityButton
                    quantity={cartProduct.quantity}
                    onIncrement={updateQuantity("increment")}
                    onDecrement={updateQuantity("decrement")}
                  />
                </div>
              )}

              <BookmarkButton
                inBookmarks={!!inBookmarks}
                onAdd={handleBookmarks("add")}
                onRemove={handleBookmarks("remove")}
              />
            </div>

            {/* <p>???????????????? 5-7 ????????</p> */}
            <div className={styles.configuration}>
              <h3 className={styles.configuration__section_title}>
                ????????????????????????:
              </h3>
              <Config config={config} />
            </div>
          </div>
        </div>

        <Reviews />
      </>
    );
  }

  return <div>{content}</div>;
};

export default Product;
