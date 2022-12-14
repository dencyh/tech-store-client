interface YmapsLoader {
  promise: Promise<unknown> | undefined;
  load: () => Promise<unknown>;
}

export const ymapsLoader: YmapsLoader = {
  promise: undefined,
  load(): Promise<any> {
    const src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.REACT_APP_YANDEX_MAPS_API}&lang=ru_RU`;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    if (!this.promise) {
      console.log("Appending maps script");
      this.promise = new Promise((res, rej) => {
        document.head.appendChild(script);
        script.onload = res;
        script.onerror = rej;
      }).then(() => {
        return new Promise((res, rej) => ymaps.ready(res));
      });
    }
    return this.promise;
  }
};
