import React from "react";
import PropTypes from "prop-types";
import styles from "./textArea.module.scss";

interface Props
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  error?: string;
}

const TextArea: React.FC<Props> = ({
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
      <textarea
        name={name}
        id={name}
        onChange={(e) => onChange({ name, value: e.target.value })}
        value={value}
        className={styles.input}
        rows={rest.rows ? rest.rows : 3}
        {...rest}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextArea;
