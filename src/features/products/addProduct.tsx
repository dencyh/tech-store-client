import React, { useState } from "react";
import TextInput from "../../components/common/form/textInput/textInput";
import Layout from "../../pages/layout";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: ""
  });

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Layout>
      <form style={{ marginTop: "20px" }}>
        <TextInput
          label="Название"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <TextInput
          label="Название"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </form>
    </Layout>
  );
};

export default AddProduct;
