import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./Pages/Homepage";
import CatalogPage from "./Pages/CatalogPage";
import SingleProductPage from "./Pages/SingleProductPage";
import CheckoutPage from "./Pages/CheckoutPage";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/products" element={<CatalogPage />} />
            <Route path="/products/:slug" element={<SingleProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
