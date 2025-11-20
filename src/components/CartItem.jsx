import { useCart } from "../contexts/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  // calcolo prezzo totale del singolo prodotto
  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="wrapper">
    <div className="cart-item-wrapper">
        {/* Colonna sinistra: nome prodotto */}
        <div className="cart-item-col-left">
          <img src={item.image} alt={item.name} />
        </div>

        {/* Colonna centrale: prezzo unitario e controlli quantità */}
        <div className="cart-item-col-center">
          {item.name}
          <h4>€{item.price.toFixed(2)}</h4>
          <div className="btn-wrapper">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              +
            </button>
        </div>
      </div>

      {/* Colonna destra: prezzo totale e rimuovi */}
      <div className="cart-item-col-right">
        <h4>€{totalPrice}</h4>
        <button onClick={() => removeItem(item.id)}>Rimuovi</button>
      </div>
    </div>
    </div>
  );
}
