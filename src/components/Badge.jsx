import "./Badge.css";

export default function Badge({ category, promo = false }) {
  // badge promo ha la precedenza visiva
  if (promo) {
    return <span className="badge promo">Promo</span>;
  }

  const label = category || "Sconosciuta";
  const c = String(label).toLowerCase();

  let categoryClass = "default";
  if (c.includes("vamp")) categoryClass = "vampire";
  else if (c.includes("streg")) categoryClass = "witch";
  else if (c.includes("licant")) categoryClass = "lycan";

  return <span className={`badge ${categoryClass}`}>{label}</span>;
}
