import { Link } from "react-router-dom";
import "./SingleProduct.css";
import Badge from "./Badge";
import { useCart } from "../contexts/CartContext";

export default function SingleProduct({ product }) {
  const { addItem } = useCart();

  if (!product) return null;

  // prezzo semplice: prende price o amount
  const price = product.price || product.amount || 0;
  const priceText = price ? `${price} €` : "—";

  return (
    <div className="card">
      <Link to={`/products/${product.slug}`} className="card-link">
        <div className="card-img-container">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="card-text-container">
          <h4 className="card-title">{product.name}</h4>
          <Badge category={product.category} />
          <div className="price">
            <b>{priceText}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}
