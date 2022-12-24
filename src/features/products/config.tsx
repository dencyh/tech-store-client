import React from "react";
import { ProductConfig } from "../../utils/findDiff";
import ConfigOption from "./configOption";

interface Props {
  config: ProductConfig;
}
const Config: React.FC<Props> = ({ config }) => {
  const handleChange = () => {
    console.log("change");
  };

  return (
    <ul>
      {Object.keys(config).map((key) => (
        <ConfigOption
          key={key}
          name={key}
          options={config[key]}
          onChange={handleChange}
        />
      ))}
    </ul>
  );
};
export default Config;
