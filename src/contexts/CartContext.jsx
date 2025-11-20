import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // qui teniamo lo stato del carrello: parte vuoto
  const [cart, setCart] = useState([]);
  // funzione per aggiungere un prodotto
  // se il prodotto c'è già allora aumenta quantità
  // se non c'è lo aggiunge
  function addItem(item) {
    const existing = cart.find(p => p.id === item.id);
    if (existing) {
      const updated = cart.map(p =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  // funzione per rimuovere un prodotto usando l'id
  function removeItem(id) {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  }

  // funzione per aggiornare la quantità di un prodotto
  function updateQuantity(id, qty) {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    ).filter(item => item.quantity > 0); // rimuove prodotti con quantità 0
    setCart(updated);
  }

  // totale del carrello (prezzo * quantità)
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // qui mettiamo a disposizione tutto ai componenti figli
  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

// hook per usare il cart context in modo più comodo
export function useCart() {
  return useContext(CartContext);
}
