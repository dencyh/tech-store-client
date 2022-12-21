import React, { useEffect, useRef } from "react";

import Textarea from "../../components/form/textarea/textarea";
import { useForm } from "../../hooks/useForm";
import styles from "./reviews.module.scss";
import { ReviewInput } from "./reviewsSlice";
import StarRating from "./starRating";

const initValues = {
  score: 0,
  advantages: "",
  disadvantages: "",
  comment: ""
};

interface Props {
  onClose: () => void;
}

const ReviewModal: React.FC<Props> = ({ onClose }) => {
  const { form, handleChange, handleSubmit } = useForm(initValues, onSubmit);

  console.log(form);

  function onSubmit() {
    console.log(123);
  }

  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className={styles.modal_container}>
      <form className={styles.modal} ref={modalRef} onSubmit={handleSubmit}>
        <div className={styles.score}>
          <h3>Ваша оценка</h3>
          <StarRating value={form.score} name="score" onChange={handleChange} />
        </div>
        <Textarea
          rows={5}
          label="Достоинства"
          name="advantages"
          value={form.advantages}
          onChange={handleChange}
        />
        <Textarea
          rows={5}
          label="Недостатки"
          name="disadvantages"
          value={form.disadvantages}
          onChange={handleChange}
        />
        <Textarea
          rows={5}
          label="Комментарий"
          name={""}
          value={form.comment}
          onChange={handleChange}
        />

        <button className={styles.btn}>Отправить</button>
      </form>
    </div>
  );
};
export default ReviewModal;
