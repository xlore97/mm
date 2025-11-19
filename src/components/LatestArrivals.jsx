import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "../components/ProductsList";

export default function LatestArrivals() {
  //Stato per memorizzare i prodotti ricevuti dal backend
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // l'endpoint backend deve restituire gli ultimi arrivi
    axios
      .get("http://localhost:3000/api/products?filter=latest")
      .then((res) => {
        // Normalizziamo la risposta (può essere res.data.data oppure res.data)
        const all = res.data?.data ?? res.data ?? [];
        // Calcoliamo il cutoff per 7 giorni fa
        const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
        // Filtriamo i prodotti che hanno `added_at` negli ultimi 7 giorni
        const recent = all
          .filter((p) => {
            const t = Date.parse(p.added_at);
            return !isNaN(t) && t >= cutoff;
          })
          // ordiniamo per data più recente
          .sort((a, b) => Date.parse(b.added_at) - Date.parse(a.added_at));

        setProducts(recent);
      })
      //Se c'è un errore nella chiamata, lo logghiamo in console
      .catch((err) => console.error(err));
    //Array vuoto come secondo argomento significa "esegui solo al primo montaggio"
  }, []);

  //Passiamo a ProductList la lista dei prodotti come prop
  return <ProductsList products={products} />;
}
