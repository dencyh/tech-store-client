import { useEffect, useState } from "react";

export const useForm = <T>(initState: T, onSubmit: (form: T) => void) => {
  const [form, setForm] = useState(initState);

  useEffect(() => {
    setForm(initState);
  }, [initState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };
  const handleChange = ({
    name,
    value
  }: {
    name: string;
    value: string | number;
  }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  return { form, handleChange, handleSubmit, setForm };
};
