import SingleProduct from "./SingleProduct";
import "./ProductsList.css";

export default function ProductsList({ products = [], viewMode = "grid" }) {
  const isList = viewMode === "list";

  return (
    <div className="list-container">
      <div className={`product-list-row ${isList ? "list-mode" : "grid-mode"}`}>
        {products.map((p) => (
          <SingleProduct key={p.id} product={p} isList={isList} />
        ))}
      </div>
    </div>
  );
}
