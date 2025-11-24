import "./CartDrawer.css";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart } = useCart();

  return (
    <div className={`drawer-wrapper ${isOpen ? "active" : ""}`}>
      {/* Sfondo solo se il carrello è vuoto */}
      <button className="close-btn" onClick={onClose}>
        X
      </button>

      {cart.length === 0 ? (
        <div className="cart">
          <h2 className="empty-message">Il tuo carrello è vuoto!</h2>
          <p>Non far piangere i non-morti della logistica</p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <OrderSummary isBillingComplete={cart.length > 0} onClose={onClose} />
        </>
      )}
    </div>
  );
}
