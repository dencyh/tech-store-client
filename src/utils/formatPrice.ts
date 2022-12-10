export function formatPrice(price: number, noCurrency: boolean = false) {
  return Intl.NumberFormat("ru-RU").format(price) + (noCurrency ? "" : "₽");
}
