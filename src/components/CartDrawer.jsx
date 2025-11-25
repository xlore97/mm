import "./CartDrawer.css";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";
import { useCart } from "../contexts/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart } = useCart();

  return (
    <div className={`drawer-wrapper ${isOpen ? "active" : ""}`}>
      {/* Bottone chiudi */}
      <button className="close-btn" onClick={onClose}>
        X
      </button>

      {/* Immagine carrello vuoto: solo se cart.length === 0 */}
      {cart.length === 0 && (
        <img
          src="/empty-cart.png.PNG" //
          alt="Carrello vuoto"
          style={{
            position: "absolute",
            top: "220px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "auto",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.8,
          }}
        />
      )}

      {/* Contenuto carrello */}
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
