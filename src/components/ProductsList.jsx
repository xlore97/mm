import SingleProduct from "./SingleProduct";

// ProductsList riceve una prop "products", che di default è un array vuoto.
// Questo evita errori se il componente viene usato senza passare products.
export default function ProductsList({ products = [] }) {
  
  return (
    <div className="product-list">
      {products.map((p) => (
        // passiamo il prodotto come prop al componente SingleProduct
        <SingleProduct key={p.id} product={p} />
      ))}
    </div>
  );
}