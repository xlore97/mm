import { useState } from "react";
import SingleProduct from "./SingleProduct";

const VISIBLE_COUNT = 4; // quante card mostrare alla volta

export default function Carousel() {
  const [startIndex, setStartIndex] = useState(0);
  console.log("Start index:", startIndex);

  // per ora array finto
  // in futuro qui si useranno i prodotti suggeriti dal backend
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < items.length;

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(startIndex + 1);
    }
  };

  // "finestra" di elementi che devono essere visibili
  const visibleItems = items.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <div className="carousel-container">
      {/* Freccia sinistra */}
      <button
        className="carousel-btn"
        onClick={handlePrev}
        disabled={!canGoPrev}
      >
        ‹
      </button>

      {/* ----------- Track con le card ------------ */}
      <div className="carousel-track">
        {visibleItems.map((item, index) => (
          <SingleProduct key={`${item}-${index}`} />
        ))}
      </div>

      {/* Freccia destra */}
      <button
        className="carousel-btn"
        onClick={handleNext}
        disabled={!canGoNext}
      >
        ›
      </button>
    </div>
  );
}
