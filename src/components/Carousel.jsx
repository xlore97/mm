import { useState, useEffect } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import "./Carousel.css";

// Numero di card visibili alla volta
const VISIBLE_COUNT = 4;

export default function Carousel({ category, excludeId }) {
  // Indice iniziale della "finestra" del carousel
  const [startIndex, setStartIndex] = useState(0);
  // Stato per memorizzare i prodotti ricevuti dal backend
  const [products, setProducts] = useState([]);

  // useEffect per caricare i prodotti consigliati dal backend al montaggio del componente
  useEffect(() => {
    axios
      // Chiamata al backend per prodotti consigliati
      .get("http://localhost:3000/api/products?filter=suggested")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
    // Dipendenza vuota: viene eseguito solo una volta al montaggio
  }, []);

  // Controllo se possiamo spostarci a sinistra
  const canGoPrev = startIndex > 0;

  // Filtra i prodotti per categoria (se fornita) e opzionalmente esclude l'elemento corrente
  const filteredProducts = category
    ? products.filter(
        (p) =>
          String(p.category || "").toLowerCase() ===
            String(category || "").toLowerCase() &&
          String(p.id) !== String(excludeId)
      )
    : products;

  // Controllo se possiamo spostarci a destra
  const canGoNext = startIndex + VISIBLE_COUNT < filteredProducts.length;

  // Funzione per spostare la finestra a sinistra
  const handlePrev = () => {
    if (canGoPrev) setStartIndex(startIndex - 1);
  };

  // Funzione per spostare la finestra a destra
  const handleNext = () => {
    if (canGoNext) setStartIndex(startIndex + 1);
  };

  // Prende i prodotti visibili nella "finestra" corrente
  const visibleItems = filteredProducts.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  return (
    <div className="carousel-container">
      {/* Freccia sinistra */}
      <button
        className="carousel-arrow"
        onClick={handlePrev}
        disabled={!canGoPrev}
        aria-label="Prodotti precedenti"
      >
        ‹
      </button>

      {/* Track del carousel con le card */}
      <div className="carousel-track">
        {visibleItems.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Freccia destra */}
      <button
        className="carousel-arrow"
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="Prodotti successivi"
      >
        ›
      </button>
    </div>
  );
}
