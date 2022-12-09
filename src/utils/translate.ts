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
    os: "Операционная система",
    name: "Название",
    price: "Цена",
    releaseDate: "Год выпуска",
    screenSize: "Диагональ экрана",
    resolution: "Разрешение",
    refreshRate: "Частота обновления экрана",
    cpu: "Процессор",
    cpuCores: "Количество ядер",
    gpu: "Видеокарта",
    ram: "Оперативная память",
    capacity: "Встроенная память",
    cellularNetwork: "Стандарт сети",
    simCount: "Количество сим-карт",
    batteryLife: "Время автономной работы",
    biometrics: "Биометрия"
  }
};

export function translate(type: string, key: string): string {
  return translations[type][key] || key;
}
