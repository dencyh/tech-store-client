import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextArea from "../../components/common/form/textArea/textArea";
import TextInput from "../../components/common/form/textInput/textInput";
import Layout from "../../pages/layout";
import { CreateProductInput } from "../../schemas/products/core.product.schema";
import { Product } from "../../types/products/core.product";
import { translate } from "../../utils/translate";
import styles from "./product.module.scss";
import _ from "lodash";

const initState = {
  type: "",
  name: "",
  brandName: "",
  color: "",
  price: "",
  releaseDate: "",
  description: "",
  os: "",
  screenSize: "",
  resolutionX: "",
  resolutionY: "",
  refreshRate: "",
  cpu: "",
  ram: "",
  capacity: "",
  batteryLife: "",
  cpuCores: "",
  gpu: ""
};

const AddProduct = () => {
  const category = useParams().category || "";
  const [values, setValues] = useState(initState);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      name,
      brandName,
      color,
      price,
      releaseDate,
      description,
      ...specs
    } = values;

    const {
      screenSize,
      refreshRate,
      resolutionX,
      resolutionY,
      ram,
      capacity,
      batteryLife,
      cpuCores,
      ...restSpecs
    } = specs;

    const result = {
      type: category,
      name,
      brandName,
      color,
      price: Number(price),
      releaseDate: Number(releaseDate),
      description,
      specs: {
        screenSize: Number.parseFloat(screenSize),
        refreshRate: Number(refreshRate),
        resolution: [Number(resolutionX), Number(resolutionY)],
        ram: Number(ram),
        capacity: Number(capacity),
        batteryLife: Number(batteryLife),
        ...restSpecs
      }
    };
    console.log(result);
  };
  return (
    <Layout>
      <h3 style={{ marginBottom: "20px" }}>{translate(category)}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        {Object.keys(initState).map((key) => {
          return key === "description" ? (
            <div style={{ minWidth: "400px" }}>
              <TextArea
                key={key}
                label={key}
                name={key}
                rows={5}
                value={values[key as keyof typeof initState]}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div style={{ minWidth: "400px" }}>
              <TextInput
                key={key}
                label={key}
                name={key}
                value={values[key as keyof typeof initState]}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button className={styles.btn}>Создать</button>
      </form>
    </Layout>
  );
};

export default AddProduct;
