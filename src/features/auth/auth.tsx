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

const Auth: React.FC<Props> = ({ authRef, onFormClose }) => {
  const [formType, setFormType] = useState<FormType>("login");

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
