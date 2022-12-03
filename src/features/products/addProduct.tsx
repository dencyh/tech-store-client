import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Textarea from "../../components/common/form/textarea/textarea";
import Input from "../../components/common/form/input/input";
import DND from "../../components/ui/dnd/dnd";
import Layout from "../../pages/layout";
import { translate } from "../../utils/translate";
import styles from "./product.module.scss";

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
      setValues((prev) => ({
        ...prev,
        resolution: { ...prev.resolution, [name]: value }
      }));
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title} style={{ marginBottom: "20px" }}>
          {translate("category", category)}
        </h3>
        <div className={styles.grid}>
          {Object.keys(initState).map((key) => {
            if (key === "resolution") {
              return (
                <div key={key} className={styles.resolution}>
                  <Input
                    key={"resolutionX"}
                    label={"W"}
                    name={"resolutionX"}
                    value={values["resolution"]["resolutionX"]}
                    onChange={handleChange}
                  />
                  <span>X</span>
                  <Input
                    key={"resolutionY"}
                    label={"H"}
                    name={"resolutionY"}
                    value={values["resolution"]["resolutionY"]}
                    onChange={handleChange}
                  />
                </div>
              );
            } else {
              return (
                key !== "description" && (
                  <Input
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

        <Textarea
          label={"Описание"}
          name={"description"}
          rows={5}
          value={values.description}
          onChange={handleChange}
        />
        <button className={styles.btn}>Сохранить</button>
      </form>

      {/* <form className={styles.form}> */}
      <DND />
      {/* </form> */}
    </Layout>
  );
};

export default AddProduct;
