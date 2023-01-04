import React, { useEffect, useState } from "react";
import { AddressInput } from "../../features/profile/sections/addresses";
import { Address } from "../../features/user/userSlice";
import { ymapsLoader } from "../../utils/ymapsLoader";
import styles from "./map.module.scss";
import Marker from "./marker";
import cn from "classnames";

interface Props {
  onSubmit: (address: AddressInput) => void;
  selectedAddress?: Address;
}

const Map: React.FC<Props> = ({ onSubmit, selectedAddress }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [address, setAddress] = useState<AddressInput>(
    selectedAddress || ({} as AddressInput)
  );
  const [userActive, setUserActive] = useState(true);

  useEffect(() => {
    const center = selectedAddress
      ? selectedAddress.coords
      : [55.77224833337829, 37.62099757844506];
    ymapsLoader.load().then((ymaps: any) => {
      function createMap(state: any) {
        const map = new ymaps.Map(
          "map",
          {
            ...state,
            controls: ["zoomControl"]
          },
          {}
        );
        const searchControl = new ymaps.control.SearchControl({
          options: {
            noPlacemark: true,
            searchControlProvider: "yandex#search"
          }
        });
        map.controls.add(searchControl);

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
              setAddress((prev) => ({
                ...addressObj,
                text: newAddress.get("name"),
                coords: newCenter,
                apartment: ""
              }));
            });
          });
      }

      ymaps.geolocation.get().then(
        (res: any) => {
          const bounds = res.geoObjects.get(0).properties.get("boundedBy");
          const state = ymaps.util.bounds.getCenterAndZoom(bounds, [450, 450]);

          if (selectedAddress) {
            createMap({
              center,
              zoom: 17
            });
          } else {
            createMap(state);
          }
        },
        (e: any) => {
          createMap({
            center,
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
          className={cn(styles.btn, address.text ? "" : styles.btn_disabled)}
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
