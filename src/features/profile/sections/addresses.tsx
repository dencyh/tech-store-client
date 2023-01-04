import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/form/input/input";
import Textarea from "../../../components/form/textarea/textarea";
import Loader from "../../../components/loader/loader";
import Map from "../../../components/map/map";
import { useForm } from "../../../hooks/useForm";
import {
  Address,
  useCreateAddressMutation,
  useGetUserAddressesQuery,
  useRemoveUserAddressMutation,
  useUpdateAddressMutation
} from "../../user/userSlice";
import EditableField from "./components/editableField";
import styles from "./sections.module.scss";
import cn from "classnames";

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

  // Create new address
  const [
    createAddress,
    { isLoading: createLoading, isSuccess: created, error: createFailed }
  ] = useCreateAddressMutation();

  useEffect(() => {
    if (created) {
      toast.success("Адрес успешно сохранен");
    }
    if (createFailed) {
      toast.error(createFailed.toString());
    }
  }, [createLoading]);

  // Update address
  const [
    updateAddress,
    { isLoading: updateLoading, isSuccess: updated, error: updateFailed }
  ] = useUpdateAddressMutation();
  useEffect(() => {
    if (updated) {
      toast.success("Адрес обновлен");
    }
    if (updateFailed) {
      toast.error(updateFailed.toString());
    }
  }, [updateLoading]);

  // Remove address
  const [
    removeAddress,
    { isLoading: removeLoading, isSuccess: removed, error: removeFailed }
  ] = useRemoveUserAddressMutation();
  useEffect(() => {
    if (removed) {
      toast.success("Адрес удален");
    }
    if (removeFailed) {
      toast.error(removeFailed.toString());
    }
  }, [removeLoading]);

  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const onSubmit = (form: AddressInput) => {
    if (editingAddress) {
      updateAddress({ ...editingAddress, ...form });
    } else {
      createAddress(form);
    }
    setShowForm(false);
    setShowMap(false);
    setEditingAddress(undefined);
  };

  const { form, handleChange, handleSubmit, setForm } = useForm(
    addressBoilerplate,
    onSubmit
  );

  const handleAddButton = () => {
    // Add new on/off
    if (showMap) {
      setShowMap(false);
      // If canceled while editing - close all
      if (editingAddress) {
        setShowForm(false);
        setEditingAddress(undefined);
        return;
      }
    } else {
      setShowMap(true);
    }
    // Go back to map while in form
    if (showForm) {
      setShowForm(false);
      setShowMap(true);
    }
  };

  const handleCoords = (data: AddressInput) => {
    // Show form when chosen on map
    setShowMap(false);
    setShowForm(true);

    setForm((prev) => ({ ...prev, ...data }));
  };

  const handleEditAddress = (address: Address) => {
    return function () {
      // Show form and map to edit
      setShowMap(true);
      setShowForm(true);
      setEditingAddress(address);
      setForm(address);
    };
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваши адреса</h3>
      <button
        className={cn(styles.btn, styles.btn_primary)}
        onClick={handleAddButton}
      >
        {showMap ? "Отмена" : showForm ? "Назад к карте" : "Добавить адрес"}
      </button>
      {showMap && (
        <Map onSubmit={handleCoords} selectedAddress={editingAddress} />
      )}
      {showForm && (
        <form className={styles.details_container} onSubmit={handleSubmit}>
          <div className={styles.details_item}>
            <div className={styles.edit_form}>
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
          </div>
        </form>
      )}
      {!editingAddress && userAddresses[0] && (
        <div className={styles.details_container}>
          {createLoading || updateLoading ? (
            <Loader />
          ) : (
            userAddresses.map((address) => (
              <EditableField
                title="Адрес по умолчанию"
                key={address._id}
                value={address.text}
                onEdit={handleEditAddress(address)}
                onRemove={() => removeAddress(address._id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default Addresses;
