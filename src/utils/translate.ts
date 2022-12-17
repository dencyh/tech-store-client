const translations: { [key: string]: { [key: string]: string } } = {
  type: {
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
  },
  specs: {
    "specs.os": "Операционная система",
    color: "Цвет",
    name: "Название",
    price: "Цена",
    releaseDate: "Год выпуска",
    "specs.screenSize": "Диагональ экрана",
    "specs.resolution": "Разрешение",
    "specs.refreshRate": "Частота обновления экрана",
    "specs.cpu": "Процессор",
    "specs.cpuCores": "Количество ядер",
    "specs.gpu": "Видеокарта",
    "specs.ram": "Оперативная память",
    "specs.capacity": "Встроенная память",
    "specs.cellularNetwork": "Стандарт сети",
    "specs.simCount": "Количество сим-карт",
    "specs.batteryLife": "Время автономной работы",
    "specs.biometrics": "Биометрия"
  }
};

export function translate(type: string, key: string): string {
  return translations[type][key] || key;
}
