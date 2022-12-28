import React, { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/loader/loader";
import { Spinner } from "../../../components/ui/spinner/spinner";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../user/userSlice";
import EditableField from "./components/editableField";
import styles from "./sections.module.scss";

const Details = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Личные данные</h3>

      {!currentUser ? (
        <Loader />
      ) : (
        <div className={styles.details_container}>
          <EditableField
            title="Фамилия"
            value={currentUser.lastName}
            name="lastName"
          />

          <EditableField
            title="Фамилия"
            value={currentUser.firstName}
            name="firstName"
          />
          <EditableField
            title="Электронная почта"
            value={currentUser.email}
            name="email"
          />
          <EditableField
            title="Пароль"
            value={"••••••••••••"}
            name="password"
          />
        </div>
      )}
    </div>
  );
};
export default Details;
