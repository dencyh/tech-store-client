import React, { useEffect, useState } from "react";
import { ymapsLoader } from "../../utils/ymapsLoader";
import styles from "./map.module.scss";
import Marker from "./marker";

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [coords, setCoords] = useState([0, 0]);
  const [address, setAddress] = useState("");
  const [userActive, setUserActive] = useState(true);

  useEffect(() => {
    ymapsLoader.load().then((ymaps: any) => {
      function createMap(state: any) {
        const map = new ymaps.Map(
          "map",
          {
            ...state,
            controls: ["zoomControl", "searchControl"]
          },
          {
            searchControlProvider: "yandex#search"
          }
        );

        map.events
          .add("actionbegin", () => {
            setAddress("");
            setUserActive(true);
          })
          .add("boundschange", function (e: any) {
            setUserActive(false);
            const newCenter = e.get("newCenter");
            setCoords(newCenter);
            ymaps.geocode(newCenter, { kind: "house" }).then((res: any) => {
              setAddress(res.geoObjects.get(0).properties.get("name"));
            });
          });
      }

      ymaps.geolocation.get().then(
        (res: any) => {
          const bounds = res.geoObjects.get(0).properties.get("boundedBy");
          const state = ymaps.util.bounds.getCenterAndZoom(bounds, [450, 450]);
          createMap(state);
          createMap({
            center: [55.77224833337829, 37.62099757844506],
            zoom: 10
          });
        },
        (e: any) => {
          createMap({
            center: [55.77224833337829, 37.62099757844506],
            zoom: 10
          });
        }
      );
    });
    setIsLoading(false);
  }, []);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className={styles.map} id="map">
        <h3 className={styles.address}>{address}</h3>
        <div className={styles.marker_container}>
          <Marker userActive={userActive} />
        </div>
      </div>
    </div>
  );
};
export default Map;
