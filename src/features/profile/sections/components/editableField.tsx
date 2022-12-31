import React, { useMemo, useState } from "react";
import Input from "../../../../components/form/input/input";
import { useForm } from "../../../../hooks/useForm";
import { useValidate } from "../../../../hooks/useValidate";
import { useAppSelector } from "../../../../redux/hooks";
import { updateUserSchema } from "../../../../schemas/user.schema";
import {
  selectCurrentUser,
  useUpdateUserMutation
} from "../../../user/userSlice";
import styles from "../sections.module.scss";

interface Props {
  title?: string;
  value: string;
  name?: string;
  buttonText?: string;
  onEdit?: (args: unknown) => unknown;
  onRemove?: (args: unknown) => unknown;
}
const EditableField: React.FC<Props> = ({
  title,
  value,
  name = "",
  buttonText = "Изменить",
  onEdit,
  onRemove
}) => {
  const [editing, setEditing] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);

  const initState = useMemo(() => ({ [name]: value }), [value, editing]);

  const [updateUser] = useUpdateUserMutation();

  const onSubmit = () => {
    if (!isValid || !currentUser) return;

    updateUser(form);
    setEditing(false);
  };

  const { form, handleChange, handleSubmit } = useForm(initState, onSubmit);

  const { isValid, errors } = useValidate(form, updateUserSchema);

  const content = !editing ? (
    <>
      <div className={styles.item_content}>
        <h4 className={styles.item_title}>{title}</h4>
        <p>{value}</p>
      </div>

      <div className={styles.item_controls}>
        <button
          className={styles.btn}
          aria-label="edit button"
          onClick={onEdit ? onEdit : () => setEditing(true)}
        >
          {buttonText}
        </button>
        <button
          className={styles.btn}
          aria-label="remove button"
          onClick={onRemove ? onRemove : undefined}
        >
          Удалить
        </button>
      </div>
    </>
  ) : (
    <form className={styles.edit_form} onSubmit={handleSubmit}>
      <Input
        label={title}
        name={name}
        value={form[name]}
        onChange={handleChange}
        error={errors[name]}
      />
      <button type="submit" className={styles.btn}>
        Подтвердить
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => setEditing(false)}
      >
        Отмена
      </button>
    </form>
  );

  return <div className={styles.details_item}>{content}</div>;
};
export default EditableField;
