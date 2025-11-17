import { Link } from "react-router-dom";
import TemporaryPic from "../assets/test-img.avif";

export default function SingleProduct() {
  return (
    <div className="card">
      {/* Contenitore immagine */}
      <div className="card-img-container">
        <img src={TemporaryPic} alt="Prodotto provvisorio" />
      </div>

      {/* Contenitore testo e pulsante */}
      <div className="card-text-container">
        <h4>Titolo</h4>
        <div className="category-label">Label categoria</div>
        <div className="price"><b>Prezzo</b></div>

        {/* Pulsante per checkout */}
        <Link to="/checkout" className="card-button">
          Aggiungi al Carrello
        </Link>
      </div>
    </div>
  );
}
