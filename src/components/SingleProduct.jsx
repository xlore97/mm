import { Link } from "react-router-dom";

export default function SingleProduct({ product }) {
  if (!product) return null;

  // Mappa il valore della categoria (potrebbe essere in italiano) alla classe CSS
  const categoryClass = (() => {
    const c = String(product.category || "").toLowerCase();
    if (c.includes("vamp")) return "vampire"; // vampiri
    if (c.includes("streg")) return "witch"; // streghe
    if (c.includes("licant") || c.includes("lycan")) return "lycan"; // licantropi / lycan
    return "";
  })();

  // Try to extract a numeric price from common fields and format it
  const extractNumericPrice = (p) => {
    if (!p) return null;
    if (typeof p.price === "number") return p.price;
    if (typeof p.price === "string" && !isNaN(Number(p.price))) return Number(p.price);
    if (typeof p.price_cents === "number") return p.price_cents / 100;
    if (typeof p.price_cents === "string" && !isNaN(Number(p.price_cents))) return Number(p.price_cents) / 100;
    if (typeof p.amount === "number") return p.amount;
    if (typeof p.amount === "string" && !isNaN(Number(p.amount))) return Number(p.amount);
    if (p.price && typeof p.price.value === "number") return p.price.value;
    if (p.price && typeof p.price.value === "string" && !isNaN(Number(p.price.value))) return Number(p.price.value);
    if (typeof p.cost === "number") return p.cost;
    if (typeof p.cost === "string" && !isNaN(Number(p.cost))) return Number(p.cost);
    return null;
  };

  const numericPrice = extractNumericPrice(product);
  let priceText;
  if (numericPrice != null && !isNaN(numericPrice)) {
    priceText = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(numericPrice);
  } else if (product.price) {
    // fallback: show raw price field if present
    priceText = `${product.price} €`;
    console.warn("Product price is not numeric, showing raw value:", product.price, product);
  } else {
    priceText = "—";
    console.warn("Product has no price field:", product);
  }

  return (
    <div className="card">
      {/* Link che porta alla pagina del prodotto singolo usando lo slug del prodotto */}
      <Link to={`/products/${product.slug}`}>
        {/* Contenitore per l'immagine del prodotto */}
        <div className="card-img-container">
          <img src={product.image} alt={product.name} />
        </div>
        {/* Contenitore per il testo del prodotto */}
        <div className="card-text-container">
          <h4>{product.name}</h4>
          <div className={`category-label ${categoryClass}`}>{product.category}</div>
          <div className="price">
            <b>{priceText}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}
