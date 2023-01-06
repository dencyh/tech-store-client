import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./carousel.module.scss";
import cn from "classnames";
import { throttle } from "../../utils/throttle";

interface Props {
  children: JSX.Element[];
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
}
const Carousel: React.FC<Props> = ({
  title,
  subtitle,
  children,
  fullWidth
}) => {
  const [position, setPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const [offsetWidth, setOffsetWidth] = useState(0);
  const [rightLimit, setRightLimit] = useState(0);
  useEffect(() => {
    const width = containerRef.current?.offsetWidth || 0;
    const scroll = containerRef.current?.scrollWidth || 0;

    setOffsetWidth(width);
    setRightLimit(fullWidth ? -width : width - scroll);
  }, [containerRef.current?.offsetWidth]);

  useEffect(() => {
    const resizeHandler = throttle(() => {
      const width = containerRef.current?.offsetWidth || 0;
      const scroll = containerRef.current?.scrollWidth || 0;
      const mostRight = width - scroll;
      // Set new width
      setOffsetWidth(width);
      // Set position to the most right if end of scroll doesn't align with last item
      setPosition((currentPos) => {
        if (mostRight > currentPos) {
          return mostRight;
        } else {
          return currentPos;
        }
      });
    }, 1000);

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const bounce = useCallback((to: number, back: number) => {
    setPosition(to);
    setTimeout(() => {
      setPosition(back);
    }, 500);
  }, []);

  const handleLeft = () => {
    const newPosition = position + offsetWidth;
    // If too far left
    if (newPosition > 0) {
      // Bounce only if at the start
      if (position === 0) {
        bounce(offsetWidth / 10, 0);
      } else {
        setPosition(0);
      }
    } else {
      setPosition(newPosition);
    }
  };

  const handleRight = () => {
    const newPosition = position - offsetWidth;
    // If too far right
    if (newPosition < rightLimit) {
      // Bounce only if in the end
      if (rightLimit === position) {
        bounce(rightLimit - offsetWidth / 10, rightLimit);
      } else {
        setPosition(rightLimit);
      }
    } else {
      setPosition(newPosition);
    }
  };

  return (
    <div className={styles.outer_container}>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <div className={styles.container}>
        <button
          className={cn(
            styles.handle,
            styles.handle_left,
            position >= 0 && styles.disabled
          )}
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
              <li
                className={styles.carousel_item}
                key={child.key}
                style={{ ...(fullWidth && { minWidth: `${100}%` }) }}
              >
                {child}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={cn(
            styles.handle,
            styles.handle_right,
            position <= rightLimit && styles.disabled && styles.disabled
          )}
          aria-label="right-handle"
          onClick={handleRight}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
export default Carousel;
