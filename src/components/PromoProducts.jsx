import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "../components/ProductsList";

export default function PromoProducts() {
  const [products, setProducts] = useState([]); // usa products, non promotions

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/promotions")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return <ProductsList products={products} />;
}