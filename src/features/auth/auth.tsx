import React, { useState } from "react";
import Signup from "./signup";
import styles from "./auth.module.scss";
import { useParams } from "react-router-dom";
import Login from "./login";

interface Props {
  authRef?: React.RefObject<HTMLDivElement>;
}

export type FormType = "login" | "signup";

const Auth: React.FC<Props> = ({ authRef }) => {
  const [formType, setFormType] = useState<FormType>("signup");

  console.log(formType);

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
