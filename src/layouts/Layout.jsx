import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import CartDrawer from "../components/CartDrawer";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false); // <-- UNA SOLA DEFINIZIONE

  return (
    <>
      <Header onCartClick={toggleCart} />

      <Outlet />

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
