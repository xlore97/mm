import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BigSingleProduct from "../components/BigSingleProduct";
import Carousel from "../components/Carousel";

export default function SingleProductPage() {
  // Estrae il parametro "id" dall'URL, definito nella route
  const { id } = useParams();
  // Stato per il prodotto corrente (inizialmente null, perché ancora da caricare)
  const [product, setProduct] = useState(null);
  // Stato per la quantità selezionata (inizialmente 1)
  const [quantity, setQuantity] = useState(1);
  // useEffect per caricare il prodotto dal backend appena il componente viene montato
  // o quando cambia l'id del prodotto
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Funzioni per aumentare/diminuire la quantità
  // aumenta di 1
  const increase = () => setQuantity(quantity + 1);
  // diminuisce di 1 solo se > 1
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="main-container-sing-prod">
      {/* Link per tornare alla pagina dei prodotti */}
      <Link to="/products" className="go-back-btn">
        ← Indietro
      </Link>

      {/* Componente che mostra il prodotto grande con dettagli e controlli quantità */}
      <BigSingleProduct
        product={product}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
      />

      {/* Sezione carosello con prodotti correlati o consigliati */}
      <div className="carousel-section">
        <h3>Ti potrebbe interessare</h3>
        <Carousel />
      </div>
    </div>
  );
}
