import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/form/input/input";
import Textarea from "../../../components/form/textarea/textarea";
import Map from "../../../components/map/map";
import { useForm } from "../../../hooks/useForm";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectCurrentUser,
  useCreateAddressMutation,
  useGetUserAddressesQuery
} from "../../user/userSlice";
import EditableField from "./components/editableField";
import styles from "./sections.module.scss";

export interface AddressInput {
  area: string;
  country: string;
  house: string;
  locality: string;
  province: string;
  street: string;
  apartment: string;
  text: string;
  coords: [number, number];
  comment: string;
}

const addressBoilerplate: AddressInput = {
  area: "",
  country: "",
  house: "",
  locality: "",
  province: "",
  street: "",
  apartment: "",
  text: "",
  coords: [0, 0],
  comment: ""
};

const Addresses = () => {
  const { data: userAddresses = [] } = useGetUserAddressesQuery();
  console.log(userAddresses);

  const [createAddress, { isLoading, isSuccess, error }] =
    useCreateAddressMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.info("Адрес успешно сохранен");
    }
    if (error) {
      console.log(error);
      toast.error(error.toString());
    }
  }, [isLoading]);

  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (form: AddressInput) => {
    createAddress(form);
  };

  const { form, handleChange, handleSubmit, setForm } = useForm(
    addressBoilerplate,
    onSubmit
  );

  const handleAddButton = () => {
    if (showMap) {
      setShowMap(false);
    } else {
      setShowMap(true);
    }
    if (showForm) {
      setShowForm(false);
      setShowMap(true);
    }
  };

  const handleCoords = (data: AddressInput) => {
    setShowMap(false);
    setShowForm(true);
    setForm((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваши адреса</h3>
      <button
        className={`${styles.btn} ${styles.btn_primary}`}
        onClick={handleAddButton}
      >
        {showMap ? "Отмена" : showForm ? "Назад к карте" : "Добавить адрес"}
      </button>
      {showMap && <Map onSubmit={handleCoords} />}

      {showForm && (
        <form className={styles.details_container} onSubmit={handleSubmit}>
          <div className={styles.details_item}>
            <Input
              disabled
              label="Город"
              name={"locality"}
              value={form.locality}
              onChange={handleChange}
            />
            <Input
              disabled
              label="Улица"
              name={"street"}
              value={form.street}
              onChange={handleChange}
            />
            <Input
              disabled
              label="Дом"
              name={"house"}
              value={form.house}
              onChange={handleChange}
            />
            <Input
              label="Квартира"
              name={"apartment"}
              value={form.apartment}
              onChange={handleChange}
            />
            <Textarea
              label="Комментарий"
              name={"comment"}
              value={form.comment}
              onChange={handleChange}
            />
            <button type="submit" className={styles.form_btn}>
              Сохранить
            </button>
          </div>
        </form>
      )}
      <div className={styles.details_container}>
        {userAddresses.map((address) => (
          <EditableField
            key={address._id}
            value={address.text}
            editButtonFn={() => 1}
          />
        ))}
      </div>
    </div>
  );
};
export default Addresses;
