import { useState } from "react";
import { Link } from "react-router-dom";

import BigSingleProduct from "../components/BigSingleProduct";
import Carousel from "../components/Carousel";

export default function SingleProductPage() {
  // Quantity (- e +)
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="main-container-sing-prod">
        {/* link ritorno al catalogo */}
        <Link to="/products" className="go-back-btn">
          ← Indietro
        </Link>

        {/* ----------- CARD GRANDE RIUTILIZZABILE ----------- */}
        <BigSingleProduct
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />

        {/* ----------- CAROSELLO ----------- */}
        <div className="carousel-section">
          <h3>Ti potrebbe interessare</h3>

          {/* nuovo componente dedicato al carosello */}
          <Carousel />
        </div>
      </div>
    </>
  );
}
