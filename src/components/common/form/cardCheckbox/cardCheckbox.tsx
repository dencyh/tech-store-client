import React from "react";
import styles from "./cardCheckbox.module.scss";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

const CardCheckbox: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <label className={styles.checkbox__label}>
      <input
        type="radio"
        className={styles.checkbox__input}
        name={name}
        value={value}
        onChange={(e) => onChange({ name, value: e.target.value })}
        {...rest}
      />
      <span className={styles.checkbox__tile}>
        <i className="bx bxl-twitter"></i>
        <span>{label}</span>
      </span>
    </label>
  );
};

export default CardCheckbox;
