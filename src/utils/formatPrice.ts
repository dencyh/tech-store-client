type Options = {
  currency: string;
};

export function formatPrice(price: number, options?: Options) {
  return (
    Intl.NumberFormat("ru-RU").format(price) +
    (options?.currency ? options.currency : " ₽")
  );
}
