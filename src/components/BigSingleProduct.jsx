import { useCart } from "../contexts/CartContext";
import Badge from "./Badge";
import "./BigSingleProduct.css";

export default function BigSingleProduct({ product, quantity, increase, decrease }) {
  const { addItem } = useCart();

  if (!product) return <p>Loading...</p>;

  const extractNumericPrice = (p) => {
    if (!p) return 0;
    if (typeof p.price === "number") return p.price;
    if (typeof p.price === "string" && !isNaN(Number(p.price))) return Number(p.price);
    return 0;
  };

  const numericPrice = extractNumericPrice(product);
  const priceText = numericPrice ? `€${numericPrice.toFixed(2)}` : "—";

  const handleAddToCart = () => {
    addItem({ ...product, price: numericPrice, quantity }); // aggiunge esattamente la quantità selezionata
  };

  return (
    <div className="big-card">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>
        <Badge category={product.category} />
        <p>Prezzo: {priceText}</p>
        <p>{product.description}</p>

        <div className="quantity-controls">
          <button className="quantity-btn" onClick={decrease}>-</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={increase}>+</button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
}
