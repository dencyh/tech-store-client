export function formatPrice(price: number) {
  return Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
