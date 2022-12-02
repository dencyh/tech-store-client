import React, { useEffect, useState } from "react";
import TextInput from "../../components/common/form/textInput/textInput";
import { useForm } from "../../hooks/useForm";
import { CreateUserInput, createUserSchema } from "../../schemas/user.schema";
import { translate } from "../../utils/translate";
import { FormType, validateResource } from "./auth";
import styles from "./auth.module.scss";

const initialState: CreateUserInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

interface Props {
  onFormType: (type: FormType) => void;
}
const Signup: React.FC<Props> = ({ onFormType }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const setErrorsWrapper = (errors: any) => setErrors(errors);

  const { form, handleChange, handeleSubmit } = useForm(initialState, onSumbit);

  function onSumbit() {
    validateResource(createUserSchema, form, setErrorsWrapper);
    if (Object.keys(errors).length > 0) return console.log("Ошибка в форме");

    console.log(form);
  }

  useEffect(() => {
    validateResource(createUserSchema, form, setErrorsWrapper);
  }, [form]);

  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.tip}>
        <span className={styles.tip__question}>Есть аккаунт?</span>
        <button className={styles.tip__btn} onClick={() => onFormType("login")}>
          Войти
        </button>
      </p>
      <form onSubmit={handeleSubmit}>
        {Object.keys(form).map((formKey) => (
          <div key={formKey} className={styles.form__item}>
            <TextInput
              label={translate("profile", formKey)}
              name={formKey}
              value={form[formKey as keyof typeof form]}
              onChange={handleChange}
              error={errors[formKey]}
            />
          </div>
        ))}

        <button className={styles.btn}>Зарегестрироваться</button>
      </form>
    </>
  );
};
export default Signup;
