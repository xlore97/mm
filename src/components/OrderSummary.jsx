import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ isBillingComplete, onClose }) {
  const { total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isBillingComplete) {
      navigate("/checkout"); // naviga al checkout
      if (onClose) onClose(); // chiude il drawer se fornita
    }
  };

  return (
    <div className="summary-container">
      <h2>Riepilogo Ordine</h2>
      <div className="summary-row">
        <h4>Totale:</h4>
        <h3 className="total">€{total.toFixed(2)}</h3>
      </div>
      <button
        className="checkout-btn"
        disabled={!isBillingComplete}
        onClick={handleCheckout}
      >
        Completa Ordine
      </button>
    </div>
  );
}
