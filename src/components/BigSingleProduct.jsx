import { useCart } from "../contexts/CartContext";
import Badge from "./Badge";
import "./BigSingleProduct.css";

export default function BigSingleProduct({
  product,
  quantity,
  increase,
  decrease,
  maxQuantity,
}) {
  const { addItem } = useCart();

  if (!product) return <p>Loading...</p>;

  // --- gestione prezzi base / promo ---
  const rawBase = product.regular_price ?? product.price ?? product.amount ?? 0;
  const rawPromo = product.special_price ?? null;

  const basePrice =
    typeof rawBase === "string" ? Number(rawBase) : Number(rawBase || 0);
  const promoPrice =
    rawPromo != null
      ? typeof rawPromo === "string"
        ? Number(rawPromo)
        : Number(rawPromo)
      : null;

  const hasPromo = !!promoPrice && basePrice > promoPrice;

  const currentPrice = hasPromo ? promoPrice : basePrice;

  const discountPercent =
    hasPromo && basePrice > 0
      ? Math.round((1 - promoPrice / basePrice) * 100)
      : null;

  const handleAddToCart = () => {
    addItem({
      ...product,
      stock: product.quantity,
      price: currentPrice,
      quantity,
    });
  };

  // --- stato stock per badge ---
  const stock = product.quantity ?? product.stock ?? product.available ?? 0;
  let stockBadge = null;
  if (stock <= 0) {
    stockBadge = <span className="badge stock-out">Fuori stock</span>;
  } else if (stock < 10) {
    stockBadge = <span className="badge stock-low">In esaurimento</span>;
  }

  return (
    <div className="big-card">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>

        {/* BADGE: categoria -> promo (se c'è) -> stock */}
        <div className="category-row">
          <Badge category={product.category} />
          {hasPromo && <Badge promo />}
          {stockBadge}
        </div>

        {/* PREZZO */}
        <div className="big-price-block">
          <span className="big-price-label">Prezzo:</span>

          {!hasPromo && (
            <div className="big-price-row">
              <span className="big-price-normal">
                €{currentPrice.toFixed(2)}
              </span>
            </div>
          )}

          {hasPromo && (
            <div className="big-price-row">
              <span className="big-price-original">
                €{basePrice.toFixed(2)}
              </span>
              <span className="big-price-promo">€{promoPrice.toFixed(2)}</span>
              {discountPercent !== null && (
                <span className="big-price-discount">-{discountPercent}%</span>
              )}
            </div>
          )}
        </div>

        <p className="description">{product.description}</p>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={decrease}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="quantity-number">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={increase}
            disabled={
              typeof maxQuantity === "number" ? quantity >= maxQuantity : false
            }
          >
            +
          </button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
}
