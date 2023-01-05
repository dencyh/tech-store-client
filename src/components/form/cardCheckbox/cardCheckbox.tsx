import React from "react";
import styles from "./cardCheckbox.module.scss";
import cn from "classnames";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  value: string;
  unavailable?: boolean;
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

const CardCheckbox: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  unavailable,
  ...rest
}) => {
  return (
    <label
      className={cn(styles.checkbox__label, unavailable ? styles.disabled : "")}
    >
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
        <span className={styles.inner_text}>{label}</span>
      </span>
    </label>
  );
};

export default CardCheckbox;
