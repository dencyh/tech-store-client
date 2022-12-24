import React, { useEffect, useMemo, useState } from "react";
import Input from "../../../components/form/input/input";
import { Spinner } from "../../../components/ui/spinner/spinner";
import { useForm } from "../../../hooks/useForm";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../auth/userSlice";
import EditableField from "./editableField";
import styles from "./profileItems.module.scss";

const Details = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  console.log(currentUser);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Личные данные</h3>

      {!currentUser ? (
        <Spinner />
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
