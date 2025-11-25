import "./NoProductFound.css";
import noProductImg from "../assets/images/no-product-found.jpg";

export default function NoProductFound() {
  return (
    <div className="no-products-container">
      <div className="no-products-image-wrapper">
        <img
          src={noProductImg}
          alt="Nessun prodotto trovato"
          className="no-products-image"
        />

        <div className="no-products-text-box">
          <h2 className="no-products-title">
            Nessun prodotto da brivido trovato
          </h2>
          <p className="no-products-subtitle">
            Prova a cambiare ricerca o filtri… le tenebre nascondono altra
            merce!
          </p>
        </div>
      </div>
    </div>
  );
}
