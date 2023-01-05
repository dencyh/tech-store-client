import React, { useState } from "react";
import styles from "./accordion.module.scss";
import AccordionItem, { AccordionItemProps } from "./accordionItem";

interface Props {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<Props> = ({ items, allowMultiple }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const handleToggle = (index: number) => {
    return function () {
      if (allowMultiple) {
        if (selected.includes(index)) {
          setSelected((prev) => prev.filter((current) => current !== index));
        } else {
          setSelected((prev) => prev.concat(index));
        }
      } else {
        if (selected[0] === index) {
          setSelected([]);
        } else {
          setSelected([index]);
        }
      }
    };
  };
  return (
    <div className={styles.container}>
      <div className={styles.accordion}>
        {items.map((item, index) => (
          <AccordionItem
            title={item.title}
            key={index}
            onToggle={handleToggle(index)}
            isOpen={selected.includes(index)}
          >
            {item.children}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};
export default Accordion;
