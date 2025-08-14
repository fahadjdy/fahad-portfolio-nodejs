export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }); // e.g., "Jan", "Feb"
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}
