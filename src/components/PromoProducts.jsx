import { useState, useEffect } from "react";
import axios from "axios";
import ProductsList from "../components/ProductsList";
import ProductsCarousel from "./ProductsCarousel";

export default function PromoProducts() {
  const [products, setProducts] = useState([]); // usa products, non promotions

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products") // prendi tutti i prodotti
      .then((res) => {
        const allProducts = res.data.data || [];

        // Filtra solo prodotti con promo attiva (> 0) e calcola special_price
        const promoProducts = allProducts
          .filter((p) => Number(p.promo) > 0)
          .map((p) => ({
            ...p,
            special_price: Number(
              (p.regular_price * (1 - Number(p.promo) / 100)).toFixed(2)
            ),
          }));

        setProducts(promoProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  return <ProductsCarousel products={products} />;
}