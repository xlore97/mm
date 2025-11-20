import { useCart } from "../contexts/CartContext";

export default function OrderSummary() {
  const { total } = useCart();

  return (
    <div className="summary-container">
      <h2>Riepilogo Ordine</h2>
      <div className="summary-row">
        <h4>Totale:</h4>
        <h3 className="total">€{total}</h3>
      </div>
      <button className="checkout-btn">Completa Ordine</button>
    </div>
  );
}
