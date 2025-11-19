import { useCart } from "../contexts/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    
    <div className="cart-item-wrapper">
      <div className="cart-item-col-left">{item.name}</div>
      <div className="cart-item-col-center">
        <h4>€{item.price}</h4>
        <div className="btn-wrapper">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span className="quantity">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <div className="cart-item-col-right">
        <h4>€{item.price * item.quantity}</h4>
        <button onClick={() => removeItem(item.id)}>Rimuovi</button>
      </div>
    </div>
  );
}



