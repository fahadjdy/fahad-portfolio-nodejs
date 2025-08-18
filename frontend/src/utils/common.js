export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }); // e.g., "Jan", "Feb"
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}


// New helper for <input type="date">
export function formatDateForInput(date) {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0"); // 01-12
  const day = String(d.getDate()).padStart(2, "0");       // 01-31
  const year = d.getFullYear();
  return `${year}-${month}-${day}`; // YYYY-MM-DD
}