import "./Badge.css";

export default function Badge({ category }) {
  const label = category || "Sconosciuta";
  const c = String(label).toLowerCase();

  let categoryClass = "default";

  if (c.includes("vamp")) categoryClass = "vampiri";
  else if (c.includes("streg")) categoryClass = "streghe";
  else if (c.includes("licant") || c.includes("licantropi")) categoryClass = "licantropi";

  return <span className={`badge ${categoryClass}`}>{label}</span>;
}
