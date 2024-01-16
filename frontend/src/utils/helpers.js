export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}
