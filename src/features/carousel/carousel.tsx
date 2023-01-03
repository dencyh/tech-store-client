import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import styles from "./carousel.module.scss";

interface Props {
  children: JSX.Element[];
  title?: string;
  subtitle?: string;
}
const carousel: React.FC<Props> = ({ title, subtitle, children }) => {
  const [position, setPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const offsetWidth = containerRef.current?.offsetWidth || 0;
  const scrollWidth = containerRef.current?.scrollWidth || 0;

  const handleLeft = () => {
    setPosition((prev) => (prev + offsetWidth >= 0 ? 0 : prev + offsetWidth));
  };
  const handleRight = () => {
    setPosition((prev) =>
      prev - offsetWidth <= offsetWidth - scrollWidth
        ? offsetWidth - scrollWidth
        : prev - offsetWidth
    );
  };

  return (
    <div className={styles.outer_container}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <div className={styles.container}>
        <button
          className={`${styles.handle} ${styles.handle_left}`}
          aria-label="left-handle"
          onClick={handleLeft}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className={styles.carousel_container} ref={containerRef}>
          <ul
            className={styles.carousel}
            style={{ transform: `translateX(${position}px)` }}
          >
            {children.map((child) => (
              <li className={styles.carousel_item} key={child.key}>
                {child}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`${styles.handle} ${styles.handle_right}`}
          aria-label="right-handle"
          onClick={handleRight}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
export default carousel;
