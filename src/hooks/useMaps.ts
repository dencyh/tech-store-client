import { useEffect, useState } from "react";
import { ymapsHelper } from "../utils/ymaps";

const src = `https://api-maps.yandex.ru/2.1/?apikey=empty&lang=en_RU`;

const script = document.createElement("script");
script.type = "text/javascript";
script.src = src;

export function useMaps() {
  const [isLoading, setIsLoading] = useState(true);
  const [appended, setAppended] = useState(false);

  useEffect(() => {
    if (!appended) {
      ymapsHelper.load().then((ymaps: any) => {
        setIsLoading(false);
        setAppended(true);
        const map = new ymaps.Map("map", {
          center: [55.76, 37.64],
          zoom: 10
        });
      });
    }
  }, []);

  return { isLoading };
}
