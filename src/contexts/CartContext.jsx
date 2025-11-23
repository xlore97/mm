import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Stato del carrello: inizializza da localStorage se presente
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Aggiorna localStorage ogni volta che il carrello cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Aggiungi prodotto al carrello
  // Se esiste già, somma la quantità
  function addItem(item) {
    const existing = cart.find((p) => p.id === item.id);

    const available =
      // prefer explicit stock property, fall back to product.quantity if present
      (item && (item.stock ?? item.available ?? item.quantity ?? Infinity)) || Infinity;

    if (existing) {
      const desired = existing.quantity + (item.quantity || 0);
      const newQty = Math.min(desired, available);
      const updated = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: newQty } : p
      );
      setCart(updated);
    } else {
      const addQty = Math.min(item.quantity || 0, available);
      if (addQty <= 0) return;
      setCart([...cart, { ...item, quantity: addQty }]);
    }
  }

  // Rimuovi prodotto
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // Aggiorna quantità
  function updateQuantity(id, qty) {
    const updated = cart
      .map((item) => {
        if (item.id !== id) return item;
        const available = item.stock ?? item.available ?? item.quantity ?? Infinity;
        const newQty = Math.min(qty, available);
        return { ...item, quantity: newQty };
      })
      // rimuove se quantità 0
      .filter((item) => item.quantity > 0);
    setCart(updated);
  }

  function clearCart() {
    setCart([]);
  }

  // Totale del carrello
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Numero totale di prodotti (per header)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, total, totalItems, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook comodo
export function useCart() {
  return useContext(CartContext);
}
