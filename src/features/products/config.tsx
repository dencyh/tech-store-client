import React, { useEffect, useState } from "react";
import { ProductConfig } from "../../utils/findDiff";
import ConfigOption from "./configOption";

interface Props {
  config: ProductConfig;
}
const Config: React.FC<Props> = ({ config }) => {
  const [activeConfig, setActiveConfig] = useState({});

  useEffect(() => {}, []);

  return (
    <ul>
      {Object.keys(config).map((key) => (
        <ConfigOption key={key} name={key} options={config[key]} />
      ))}
    </ul>
  );
};
export default Config;
