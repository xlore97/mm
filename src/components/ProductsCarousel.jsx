import { useState } from "react";
import SingleProduct from "./SingleProduct";
import "./Carousel.css";

// quante card vogliamo vedere alla volta
const VISIBLE_COUNT = 4;

export default function ProductsCarousel({ products = [] }) {
  const [startIndex, setStartIndex] = useState(0);

  // se non ci sono prodotti, non mostriamo il carosello
  if (!products.length) {
    return <p className="carousel-empty">Nessun prodotto da mostrare.</p>;
  }

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < products.length;

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const visibleItems = products.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <div className="carousel-container">
      {/* freccia sinistra */}
      <button
        className="carousel-arrow"
        onClick={handlePrev}
        disabled={!canGoPrev}
        aria-label="Prodotti precedenti"
      >
        ‹
      </button>

      {/* track con le card */}
      <div className="carousel-track">
        {visibleItems.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>

      {/* freccia destra */}
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
