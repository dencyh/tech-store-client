import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./accordion.module.scss";
import cn from "classnames";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

interface Props extends AccordionItemProps {
  onToggle: () => void;
  isOpen: boolean;
}

const AccordionItem: React.FC<Props> = ({
  title,
  children,
  onToggle,
  isOpen
}) => {
  const isArray = Array.isArray(children);
  return (
    <div className={styles.item}>
      <h3 className={styles.item_title}>
        <button className={styles.item_btn} onClick={() => onToggle()}>
          <span>{title}</span>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      </h3>
      <div className={cn(styles.content, isOpen && styles.active)}>
        {isArray ? children.map((child) => child) : children}
      </div>
    </div>
  );
};
export default AccordionItem;
