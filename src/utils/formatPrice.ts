type Options = {
  showCurrency: boolean;
};

export function formatPrice(price: number, options?: Options) {
  return (
    Intl.NumberFormat("ru-RU").format(price) +
    (options?.showCurrency ? "₽" : "")
  );
}
