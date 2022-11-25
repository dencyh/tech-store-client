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

function isKey<T>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

const initState = {
  name: "",
  brandName: "",
  color: "",
  price: "",
  releaseDate: "",
  os: "",
  screenSize: "",
  resolution: {
    resolutionX: "",
    resolutionY: ""
  },
  refreshRate: "",
  cpu: "",
  ram: "",
  capacity: "",
  batteryLife: "",
  cpuCores: "",
  gpu: "",
  description: ""
};

const AddProduct = () => {
  const category = useParams().category || "";
  const [values, setValues] = useState(initState);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    if (name.startsWith("resolution")) {
      setValues((prev) =>
        isKey(prev.resolution, name)
          ? { ...prev, resolution: { ...prev.resolution, [name]: value } }
          : prev
      );
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
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
      resolution,
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
        resolution: Object.values(resolution).map((item) => Number(item)),
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
      <h3 className={styles.title}>{translate(category)}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {Object.keys(initState).map((key) => {
            if (key === "resolution") {
              return (
                <div key={key} className={styles.resolution}>
                  <TextInput
                    key={"resolutionX"}
                    label={key}
                    name={"resolutionX"}
                    value={values["resolution"]["resolutionX"]}
                    onChange={handleChange}
                  />
                  <span>X</span>
                  <TextInput
                    key={"resolutionY"}
                    label={key}
                    name={"resolutionY"}
                    value={values["resolution"]["resolutionY"]}
                    onChange={handleChange}
                  />
                </div>
              );
            } else {
              return (
                key !== "description" && (
                  <TextInput
                    key={key}
                    label={key}
                    name={key}
                    value={values[key as keyof typeof initState] as string}
                    onChange={handleChange}
                  />
                )
              );
            }
          })}
        </div>

        <TextArea
          label={"Описание"}
          name={"description"}
          rows={5}
          value={values.description}
          onChange={handleChange}
        />
        <button className={styles.btn}>Создать</button>
      </form>
    </Layout>
  );
};

export default AddProduct;
