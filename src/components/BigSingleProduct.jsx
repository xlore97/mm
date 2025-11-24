import { useCart } from "../contexts/CartContext";
import Badge from "./Badge";
import "./BigSingleProduct.css";


export default function BigSingleProduct({ product, quantity, increase, decrease, maxQuantity }) {

  const { addItem } = useCart();

  if (!product) return <p>Loading...</p>;

  const extractNumericPrice = (p) => {
    if (!p) return 0;
    if (typeof p.price === "number") return p.price;
    if (typeof p.price === "string" && !isNaN(Number(p.price)))
      return Number(p.price);
    return 0;
  };

  const numericPrice = extractNumericPrice(product);
  const priceText = numericPrice ? `€${numericPrice.toFixed(2)}` : "—";

  const handleAddToCart = () => {
    addItem({ ...product, stock: product.quantity, price: numericPrice, quantity });
  };

  return (
    <div className="big-card">
      <img src={product.image} alt={product.name} />
      <div className="details">
        <h1>{product.name}</h1>

        <div className="category-row">
          <Badge category={product.category} />
          {
            (() => {
              const stock = product.quantity ?? product.stock ?? product.available ?? 0;
              if (stock <= 0) return <span className="badge stock-out">Fuori stock</span>;
              if (stock < 10) return <span className="badge stock-low">In esaurimento</span>;
              return null;
            })()
          }
        </div>
        <p>Prezzo: {priceText}</p>
        <p>{product.description}</p>

        <div className="quantity-controls">
          <button className="quantity-btn" onClick={decrease} disabled={quantity <= 1}>-</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={increase} disabled={typeof maxQuantity === 'number' ? quantity >= maxQuantity : false}>+</button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Aggiungi al carrello
        </button>
      </div>
    </div>
  );
}
