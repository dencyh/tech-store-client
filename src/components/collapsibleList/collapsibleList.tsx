import React, { useState } from "react";
import styles from "./collapsibleList.module.scss";

interface Props {
  title: string;
  children: JSX.Element[];
  visibleItems?: number;
}

const CollapsibleList: React.FC<Props> = ({
  title,
  children,
  visibleItems = 2
}) => {
  const [visible, setVisible] = useState(false);

  const croppedChildren = children.slice(0, visibleItems);

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      {visible ? (
        <ul className={styles.list}>{children}</ul>
      ) : (
        <ul>{croppedChildren}</ul>
      )}
      {children.length > croppedChildren.length && (
        <button
          className={styles.btn}
          onClick={() => setVisible((visible) => !visible)}
        >
          {visible ? "Скрыть" : "Показать все"}
        </button>
      )}
    </div>
  );
};
export default CollapsibleList;
