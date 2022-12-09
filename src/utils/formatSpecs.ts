import { formatPrice } from "./formatPrice";

function formatMemory(value: number) {
  return value > 1000 ? Math.floor(value / 1000) + " TБ" : value + " ГБ";
}

const biometrics = {
  faceId: "Face ID",
  touchId: "Touch ID"
};

export function formatSpecs(value: any, name: string) {
  let result = "";

  switch (name) {
    case "price":
      result = formatPrice(value);
      break;
    case "color":
      result = value[0].toUpperCase() + value.slice(1);
      break;
    case "resolution":
      result = value.join(" x ");
      break;
    case "screenSize":
      result = value.toString() + '"';
      break;
    case "refreshRate":
      result = value.toString() + " Гц";
      break;
    case "capacity":
      result = formatMemory(value);
      break;
    case "ram":
      result = formatMemory(value);
      break;
    case "batteryLife":
      result = value + " ч";
      break;
    case "biometrics":
      result = value
        .map((item: keyof typeof biometrics) => biometrics[item])
        .join(", ");

      break;
    default:
      result = value.toString();
  }

  return result;
}
