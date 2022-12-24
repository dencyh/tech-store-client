import React, { useEffect, useState } from "react";
import styles from "./input.module.scss";
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
  showError?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error = "",
  showError = false,
  ...rest
}) => {
  const [errorOnBlur, setErrorOnBlur] = useState(false);
  useEffect(() => {
    setErrorOnBlur(showError);
  }, [showError]);

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
          error && errorOnBlur ? styles.input_invalid : ""
        } ${isPassword ? styles.label_password : ""}`}
        {...rest}
        onBlur={() => setErrorOnBlur(true)}
      />

      {label && (
        <label
          htmlFor={name}
          className={`${styles.label}  ${
            error && errorOnBlur ? styles.label_invalid : ""
          } `}
        >
          {label}
        </label>
      )}
      {isPassword && (
        <button
          type="button"
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
      {error && errorOnBlur && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
