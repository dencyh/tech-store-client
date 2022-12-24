import React, { useState } from "react";
import Input from "../../components/form/input/input";
import { useForm } from "../../hooks/useForm";
import { useValidate } from "../../hooks/useValidate";
import { loginSchema } from "../../schemas/user.schema";
import { translate } from "../../utils/translate";
import { FormType } from "./auth";
import styles from "./auth.module.scss";
import { useUserLoginMutation } from "./userSlice";

const initialState = {
  email: "",
  password: ""
};

interface Props {
  onFormType: (type: FormType) => void;
}
const Login: React.FC<Props> = ({ onFormType }) => {
  const { form, handleChange, handleSubmit } = useForm(initialState, onSubmit);
  const [showErrors, setShowErrors] = useState(false);
  const { isValid, errors } = useValidate(form, loginSchema);

  const [userLogin] = useUserLoginMutation();

  function onSubmit() {
    if (!isValid) {
      setShowErrors(true);
      return console.log("Ошибка в форме");
    }
    userLogin(form);
  }

  return (
    <>
      <h1 className={styles.title}>Вход</h1>
      <p className={styles.tip}>
        <span className={styles.tip__question}>Нет аккаунта?</span>
        <button
          className={styles.tip__btn}
          onClick={() => onFormType("signup")}
        >
          Зарегистрироваться
        </button>
      </p>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((formKey) => (
          <div key={formKey} className={styles.form__item}>
            <Input
              label={translate("profile", formKey)}
              name={formKey}
              value={form[formKey as keyof typeof form]}
              onChange={handleChange}
              error={errors[formKey]}
              showError={showErrors}
            />
          </div>
        ))}
        <button className={`${styles.btn} ${styles.btn_disabled}`}>
          Войти
        </button>
      </form>
    </>
  );
};
export default Login;
