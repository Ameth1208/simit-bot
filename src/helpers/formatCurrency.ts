export function formatCurrency(currency) {
  const formato: any = { style: "currency", currency: "MXN" };
  const result = new Intl.NumberFormat("es-MX", formato).format(currency);
  return result;
}
