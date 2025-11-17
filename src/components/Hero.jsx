import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero">
      {/* container che racchiude tutti gli elementi nell'hero */}
      <div className="hero-items-wrapper">
        <h1>Mors Market</h1>
        <h2>Acquista oggi, perché domani potrebbe essere… troppo tardi.</h2>
        {/* link che porta a pagina catalogo */}
        <Link to="/products" className="btn">
          Esplora La Collezione
        </Link>
      </div>
    </div>
  );
}
