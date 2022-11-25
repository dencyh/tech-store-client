import { useState } from "react";

export const useForm = <T,>(initState: T, onSubmit: (form: T) => void) => {
  const [form, setForm] = useState(initState);
  const handeleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };
  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  return { handleChange, form, handeleSubmit };
};
