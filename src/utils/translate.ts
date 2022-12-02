const translations: { [key: string]: { [key: string]: string } } = {
  category: {
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
  },
  profile: {
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Электронная почта",
    password: "Пароль",
    passwordConfirmation: "Подтверждение пароля"
  }
};

export function translate(type: string, key: string): string {
  return translations[type][key] || key;
}
