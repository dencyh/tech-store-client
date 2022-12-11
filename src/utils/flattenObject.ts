export function flattenObject<T extends { [key: string]: any }>(
  obj: T
): { [key: string]: any } {
  const result: any = {};

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    if (
      typeof obj[key] == "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      const flatObject = flattenObject(obj[key]);
      for (const secondKey in flatObject) {
        if (!flatObject.hasOwnProperty(secondKey)) continue;

        result[key + "." + secondKey] = flatObject[secondKey];
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
