import React, { useEffect, useState } from "react";
import { AddressInput } from "../../features/profile/sections/addresses";
import { ymapsLoader } from "../../utils/ymapsLoader";
import styles from "./map.module.scss";
import Marker from "./marker";

interface Props {
  onSubmit: (address: AddressInput) => void;
}

const Map: React.FC<Props> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [address, setAddress] = useState<AddressInput>({} as AddressInput);
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
            setAddress({} as AddressInput);
            setUserActive(true);
          })
          .add("boundschange", function (e: any) {
            setUserActive(false);
            const newCenter = e.get("newCenter");
            ymaps.geocode(newCenter, { kind: "house" }).then((res: any) => {
              const newAddress = res.geoObjects.get(0).properties;
              const addressArr = newAddress
                .get("metaDataProperty")
                .GeocoderMetaData.Address.Components.map(
                  (entry: { kind: string; name: string }) => [
                    entry.kind,
                    entry.name
                  ]
                );
              const addressObj = Object.fromEntries(addressArr) as AddressInput;
              setAddress({
                ...addressObj,
                text: newAddress.get("text"),
                coords: newCenter,
                apartment: "",
                comment: ""
              });
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
        <h3 className={styles.address}>
          {address.text || "Выберите ваш адрес"}
        </h3>
        <button
          className={`${styles.btn} ${address.text ? "" : styles.btn_disabled}`}
          disabled={!!!address.text}
          onClick={() => onSubmit(address)}
        >
          Выбрать
        </button>
        <div className={styles.marker_container}>
          <Marker userActive={userActive} />
        </div>
      </div>
    </div>
  );
};
export default Map;
