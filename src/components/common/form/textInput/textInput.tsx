import React from "react";
import PropTypes from "prop-types";
import styles from "./textInput.module.scss";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  error?: string;
}

const TextInput: React.FC<Props> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error = "",
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <input
        type={type}
        name={name}
        id={name}
        onChange={(e) => onChange({ name, value: e.target.value })}
        value={value}
        className={`${styles.input} ${error ? styles.input_invalid : ""}`}
        {...rest}
      />
      {label && (
        <label
          htmlFor={name}
          className={`${styles.label}  ${error ? styles.label_invalid : ""}`}
        >
          {label}
        </label>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextInput;
