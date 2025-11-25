import { Link } from "react-router-dom";
import "./SingleProduct.css";
import Badge from "./Badge";
import { useCart } from "../contexts/CartContext";

export default function SingleProduct({ product, isList = false }) {
  const { addItem } = useCart();

  if (!product) return null;

  // --- prezzi di base dal prodotto ---
  const regularPrice =
    product.regular_price ?? product.price ?? product.amount ?? 0;
  const specialPrice = product.special_price ?? null;

  const hasPromo =
    specialPrice !== null &&
    specialPrice !== undefined &&
    Number(specialPrice) > 0 &&
    Number(specialPrice) < Number(regularPrice);

  const regularText = regularPrice
    ? `${Number(regularPrice).toFixed(2)} €`
    : "—";
  const specialText = specialPrice
    ? `${Number(specialPrice).toFixed(2)} €`
    : regularText;

  return (
    <div className="card">
      <Link to={`/products/${product.slug}`} className="card-link">
        <div className="card-img-container">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="card-text-container">
          <h4 className="card-title">{product.name}</h4>

          {/* Badges: prima categoria, poi eventuale promo */}
          <div className="badge-row">
            <Badge category={product.category} />
            {hasPromo && <Badge promo />}
          </div>

          {/* Blocchetto prezzi */}
          <div className="price-row">
            {hasPromo ? (
              <>
                <span className="price-old">{regularText}</span>
                <span className="price-new">{specialText}</span>
              </>
            ) : (
              <span className="price-normal">{regularText}</span>
            )}
          </div>

          {isList && <p className="list-description">{product.description}</p>}
        </div>
      </Link>
    </div>
  );
}
