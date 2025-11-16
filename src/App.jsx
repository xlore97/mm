import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./Pages/Homepage";
import CatalogPage from "./Pages/CatalogPage";
import SingleProductPage from "./Pages/SingleProductPage";

function App() {
  return (
    <>
      {/* BrowserRouter avvolge tutta l'app per gestire la navigazione */}
      <BrowserRouter>
        <Routes>
          {/* Route padre */}
          <Route element={<Layout />}>
            {/* Route figlia principale: Homepage */}
            <Route index element={<Homepage />} />
            {/* Route per la lista dei prodotti */}
            <Route path="/products" element={<CatalogPage />} />
            {/* Route prodotto singolo */}
            <Route path="/products/:slug" element={<SingleProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
