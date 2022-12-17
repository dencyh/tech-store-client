import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CardCheckbox from "../../components/common/form/cardCheckbox/cardCheckbox";
import { useAppSelector } from "../../redux/hooks";
import { formatSpecs } from "../../utils/formatSpecs";
import styles from "./product.module.scss";
import { getProductsSelectors, useGetProductQuery } from "./productSlice";

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
  const [active, setActive] = useState<any>({});

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    const id = JSON.parse(value)[0];
    console.log(id);
    const [_, type, title] = location.pathname.split("/");
    navigate(`/${type}/${title}/${id}`);

    // setValues((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(options);

  return (
    <>
      <h4 className={styles.configuration__title}>{name}</h4>
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
    </>
  );
};
export default ConfigOption;
