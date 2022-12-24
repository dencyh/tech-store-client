import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CardCheckbox from "../../components/form/cardCheckbox/cardCheckbox";
import { formatSpecs } from "../../utils/formatSpecs";
import { translate } from "../../utils/translate";
import styles from "./product.module.scss";

interface Props {
  name: string;
  options: {
    [key: string]: {
      _id: string[];
      value: any;
    };
  };
  onChange: () => void;
}
const ConfigOption: React.FC<Props> = ({ name, options }) => {
  const { id: currentProductId } = useParams();
  if (!currentProductId) return null;
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = ({ value }: { name: string; value: string }) => {
    const id = JSON.parse(value)[0];
    const [_, type, title] = location.pathname.split("/");
    navigate(`/${type}/${title}/${id}`);
  };

  return (
    <li style={{ marginBottom: "20px" }}>
      <h4 className={styles.configuration__title}>
        {translate("specs", name)}
      </h4>
      <form className={styles.configuration__options}>
        {Object.keys(options).map((key) => (
          <CardCheckbox
            key={options[key]._id[0]}
            value={JSON.stringify(options[key]._id)}
            label={formatSpecs(options[key].value, name)}
            name={name}
            checked={options[key]?._id.includes(currentProductId)}
            onChange={handleChange}
            unavailable={!options[key]?._id.includes(currentProductId)}
          />
        ))}
      </form>
    </li>
  );
};
export default ConfigOption;
