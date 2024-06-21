export function formatCurrency(currency: any) {
  const formato: any = { style: "currency", currency: "COP" };
  const result = new Intl.NumberFormat("es-CO", formato).format(currency);
  return result;
}
