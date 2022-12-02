import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./textInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [showError, setShowError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name.toLowerCase().includes("password");

  return (
    <div className={styles.container}>
      <input
        type={showPassword ? "text" : isPassword ? "password" : type}
        name={name}
        id={name}
        onChange={(e) => onChange({ name, value: e.target.value })}
        value={value}
        className={`${styles.input} ${
          error && showError ? styles.input_invalid : ""
        } ${isPassword ? styles.label_password : ""}`}
        {...rest}
        onBlur={() => setShowError(true)}
      />

      {label && (
        <label
          htmlFor={name}
          className={`${styles.label}  ${
            error && showError ? styles.label_invalid : ""
          } `}
        >
          {label}
        </label>
      )}
      {isPassword && (
        <button
          className={styles.show_password}
          aria-label="show/hide password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </button>
      )}
      {error && showError && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextInput;
