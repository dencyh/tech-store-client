import React from "react";
import { useMaps } from "../../hooks/useMaps";
import styles from "./map.module.scss";

const Map = () => {
  const { isLoading } = useMaps();

  return (
    <div>
      <h1>Map</h1>
      {isLoading && <div>Loading...</div>}
      <div className={styles.map} id="map"></div>
    </div>
  );
};
export default Map;
