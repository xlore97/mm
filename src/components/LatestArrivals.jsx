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
      .then((res) => setProducts(res.data.data))
      //Se c'è un errore nella chiamata, lo logghiamo in console
      .catch((err) => console.error(err));
    //Array vuoto come secondo argomento significa "esegui solo al primo montaggio"
  }, []);

  //Passiamo a ProductList la lista dei prodotti come prop
  return <ProductsList products={products} />;
}
