import { Link } from "react-router-dom";

export default function SingleProduct({ product }) {
  return (
    <div className="card">
      {/* Link che porta alla pagina del prodotto singolo usando lo slug del prodotto */}
      <Link to={`/product/${product.slug}`}>
        {/* Contenitore per l'immagine del prodotto */}
        <div className="card-img-container">
          <img src={product.image} alt={product.name} />
        </div>
        {/* Contenitore per il testo del prodotto */}
        <div className="card-text-container">
          <h4>{product.name}</h4>
          <div className="category-label">{product.category}</div>
          <div className="price">
            <b>{product.price} €</b>
          </div>
        </div>
      </Link>
    </div>
  );
}
