import React from "react";
import { Link } from "react-router-dom";
import TextInput from "../../components/common/form/textInput/textInput";
import { useForm } from "../../hooks/useForm";
import { translate } from "../../utils/translate";
import { FormType } from "./auth";
import styles from "./auth.module.scss";

const initialState = {
  email: "",
  password: ""
};

interface Props {
  onFormType: (type: FormType) => void;
}
const Login: React.FC<Props> = ({ onFormType }) => {
  const { form, handleChange, handeleSubmit } = useForm(initialState, onSumbit);

  function onSumbit() {
    console.log("Login");
    console.log(form);
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {Object.keys(form).map((formKey) => (
          <div key={formKey} className={styles.form__item}>
            <TextInput
              label={translate("profile", formKey)}
              name={formKey}
              value={form[formKey as keyof typeof form]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className={styles.btn}>Зарегестрироваться</button>
      </form>
    </>
  );
};
export default Login;
