const translations: { [key: string]: string } = {
  laptops: "Ноутбуки",
  smartphones: "Смартфоны",
  tablets: "Планшеты",
  watches: "Умные часы",
  photo: "Фото и видеотехника",
  drones: "Дроны и экшн-камеры",
  "smart-home": "Умный дом",
  gaming: "Игры и приставка",
  "computer-components": "ПК комплектующие",
  "headphones-audio": "Наушники и аудио"
};

export function translate(key: string): string {
  return translations[key] || key;
}
