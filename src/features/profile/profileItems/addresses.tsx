import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../auth/userSlice";
import styles from "./profileItems.module.scss";

const Addresses = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваши адреса</h3>
      <button className={`${styles.btn} ${styles.btn_primary}`}>
        Добавить адрес
      </button>
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
