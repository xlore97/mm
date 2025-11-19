import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BigSingleProduct from "../components/BigSingleProduct";
import Carousel from "../components/Carousel";

export default function SingleProductPage() {
  // Estrae il parametro "slug" dall'URL, definito nella route
  const { slug } = useParams();
  // Stato per il prodotto corrente (inizialmente null, perché ancora da caricare)
  const [product, setProduct] = useState(null);
  // Stato per la quantità selezionata (inizialmente 1)
  const [quantity, setQuantity] = useState(1);
  // Stato per loading / error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect per caricare il prodotto dal backend appena il componente viene montato
  // o quando cambia lo slug del prodotto
  useEffect(() => {
    setLoading(true);
    setError(null);

    let mounted = true;

    const fetchProduct = async () => {
      try {
        // Prima prova: endpoint diretto /api/products/{slug}
        console.log("Trying GET /api/products/" + slug);
        let res;
        try {
          res = await axios.get(`http://localhost:3000/api/products/${slug}`);
        } catch (err) {
          // Se il server risponde 400 può significare che non accetta slug in quella route
          if (err.response && err.response.status === 400) {
            console.warn("Backend returned 400 for /api/products/{slug}, trying query by slug");
            // Prova con query param ?slug=
            res = await axios.get(`http://localhost:3000/api/products?slug=${encodeURIComponent(slug)}`);
          } else {
            throw err;
          }
        }

        console.log("SingleProductPage - product response:", res);

        // Normalizziamo la shape: può essere { data: { ... } } oppure { data: [ ... ] } o direttamente l'oggetto
        let p = res.data?.data ?? res.data;
        if (Array.isArray(p)) {
          // Se riceviamo un array, cerchiamo prima l'elemento con lo slug corrispondente
          const found = p.find((item) => item.slug === slug || String(item.id) === String(slug));
          if (found) {
            p = found;
          } else {
            // fallback: usa il primo elemento ma logghiamo il caso per diagnosticare
            console.warn(
              "Received array when fetching product by slug but no matching slug found — falling back to first item",
              { requestedSlug: slug, receivedArray: p }
            );
            p = p[0] ?? null;
          }
        }

        if (mounted) setProduct(p);
      } catch (err) {
        console.error("Errore fetching product:", err);
        const msg = err.response?.data?.message ?? err.message ?? "Errore caricamento prodotto";
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [slug]);

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Errore: {error}</p>
      ) : product ? (
        <BigSingleProduct
          product={product}
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />
      ) : (
        <p>Prodotto non trovato.</p>
      )}

      {/* Sezione carosello con prodotti correlati o consigliati */}
      <div className="carousel-section">
        <h3>Ti potrebbe interessare</h3>
        <Carousel />
      </div>
    </div>
  );
}
