import React, { useState } from "react";
import Map from "../../../components/map/map";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../auth/userSlice";
import styles from "./profileItems.module.scss";

const Addresses = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [showMap, setShowMap] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Добавить адрес" ? "Добавить адрес" : "Отмена"
  );

  const handleAddButton = () => {
    setShowMap(!showMap);
    setButtonText((prev) =>
      prev === "Добавить адрес" ? "Отмена" : "Добавить адрес"
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваши адреса</h3>
      <button
        className={`${styles.btn} ${styles.btn_primary}`}
        onClick={handleAddButton}
      >
        {buttonText}
      </button>
      {showMap && <Map />}

      <div className={styles.details_container}>
        <div className={styles.details_item}>
          <h5 className={styles.item_title}>
            {currentUser?.firstName} {currentUser?.lastName}
          </h5>
          <p>
            {currentUser?.firstName} {currentUser?.lastName}
          </p>
          <button className={`${styles.btn} ${styles.right_middle}`}>
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};
export default Addresses;
