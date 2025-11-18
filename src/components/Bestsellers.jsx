import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "../components/ProductsList";

export default function Bestsellers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products?filter=bestsellers")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return <ProductsList products={products} />;
}