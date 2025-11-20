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
    if (existing) {
      const updated = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
      );
      setCart(updated);
    } else {
      // item già contiene quantity
      setCart([...cart, { ...item }]);
    }
  }

  // Rimuovi prodotto
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // Aggiorna quantità
  function updateQuantity(id, qty) {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      // rimuove se quantità 0
      .filter((item) => item.quantity > 0);
    setCart(updated);
  }

  // Totale del carrello
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Numero totale di prodotti (per header)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, total, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook comodo
export function useCart() {
  return useContext(CartContext);
}
