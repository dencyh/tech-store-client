import React, { useState } from "react";
import Signup from "./signup";
import styles from "./auth.module.scss";
import Login from "./login";
import { AnyZodObject, ZodEffects } from "zod";

interface Props {
  authRef?: React.RefObject<HTMLDivElement>;
  onFormClose?: () => void;
}

export type FormType = "login" | "signup";

export const validateResource = (
  schema: ZodEffects<AnyZodObject>,
  input: any,
  setErrors: (errors: any) => void
) => {
  try {
    schema.parse(input);
    setErrors({});
  } catch (e: any) {
    const { errors } = e;
    const result = errors.reduce((acc: any, err: any) => {
      return { ...acc, [err.path[0]]: err.message };
    }, {});
    setErrors(result);
  }
};

const Auth: React.FC<Props> = ({ authRef, onFormClose }) => {
  const [formType, setFormType] = useState<FormType>("signup");

  const handleFormType = (type: FormType) => {
    setFormType(type);
  };

  return (
    <div className={styles.container} ref={authRef}>
      <div className={styles.form}>
        {formType === "signup" ? (
          <Signup onFormType={handleFormType} />
        ) : (
          <Login onFormType={handleFormType} />
        )}
      </div>
    </div>
  );
};
export default Auth;
