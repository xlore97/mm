import "./Badge.css";

export default function Badge({ category }) {
  const label = category || "Sconosciuta";
  const c = String(label).toLowerCase();

  let categoryClass = "default";

  if (c.includes("vamp")) categoryClass = "vampire";
  else if (c.includes("streg")) categoryClass = "witch";
  else if (c.includes("licant") || c.includes("lycan")) categoryClass = "lycan";

  return <span className={`badge ${categoryClass}`}>{label}</span>;
}
