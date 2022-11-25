const translations: { [key: string]: string } = {
  laptops: "Ноутбуки"
};

export function translate(key: string): string | "Uknown" {
  return translations[key] || "Uknown";
}
