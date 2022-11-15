import React from "react";
import PropTypes from "prop-types";
import styles from "./textInput.module.scss";

interface Props {
  label: string;
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
  error = ""
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={(e) => onChange({ name, value: e.target.value })}
        value={value}
        className={styles.input}
      />
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextInput;
