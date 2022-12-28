import React, { useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./marker.module.scss";

interface Props {
  userActive: boolean;
  pinColor?: string;
  shadowColor?: string;
}

const Marker: React.FC<Props> = ({
  userActive,
  pinColor = "#7315E5",
  shadowColor = "#00000035"
}) => {
  return (
    <div>
      <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="marker">
          <g
            id="pin"
            className={`${styles.pin} ${userActive ? styles.pin_to : ""}`}
          >
            <path
              id="Vector"
              d="M60.426 40.6146C56.5645 40.6146 53.4254 37.3697 53.4254 33.3785C53.4254 29.3876 56.5645 26.1427 60.426 26.1427C64.287 26.1427 67.4263 29.3876 67.4263 33.3785C67.4263 37.3697 64.287 40.6146 60.426 40.6146Z"
              fill="white"
            />
            <path
              id="Vector_2"
              d="M62.7037 65.5438C68.1033 58.7862 80.4183 42.4085 80.4183 33.209C80.4183 22.052 71.3663 13 60.2091 13C49.052 13 40 22.052 40 33.209C40 42.4085 52.315 58.7862 57.7146 65.5438C59.0092 67.1542 61.4091 67.1542 62.7037 65.5438ZM60.2091 39.9456C56.4936 39.9456 53.4727 36.9247 53.4727 33.209C53.4727 29.4935 56.4936 26.4727 60.2091 26.4727C63.9247 26.4727 66.9456 29.4935 66.9456 33.209C66.9456 36.9247 63.9247 39.9456 60.2091 39.9456Z"
              fill={pinColor}
            />
          </g>
          <ellipse
            className={`${styles.shadow} ${userActive ? styles.shadow_to : ""}`}
            id="shadow"
            cx="60"
            cy="76.5"
            rx="20"
            ry="4.5"
            fill={shadowColor}
          />
        </g>
      </svg>
    </div>
  );
};
export default Marker;
