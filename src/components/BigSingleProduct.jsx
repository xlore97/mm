export default function BigSingleProduct({
  product,
  quantity,
  increase,
  decrease,
}) {
  // Se il prodotto non è ancora disponibile (ad esempio in fase di caricamento da backend), mostra un messaggio di caricamento
  if (!product) return <p>Loading...</p>;
  const extractNumericPrice = (p) => {
    if (!p) return null;
    if (typeof p.price === "number") return p.price;
    if (typeof p.price === "string" && !isNaN(Number(p.price))) return Number(p.price);
    if (typeof p.price_cents === "number") return p.price_cents / 100;
    if (typeof p.price_cents === "string" && !isNaN(Number(p.price_cents))) return Number(p.price_cents) / 100;
    if (typeof p.amount === "number") return p.amount;
    if (typeof p.amount === "string" && !isNaN(Number(p.amount))) return Number(p.amount);
    if (p.price && typeof p.price.value === "number") return p.price.value;
    if (p.price && typeof p.price.value === "string" && !isNaN(Number(p.price.value))) return Number(p.price.value);
    if (typeof p.cost === "number") return p.cost;
    if (typeof p.cost === "string" && !isNaN(Number(p.cost))) return Number(p.cost);
    return null;
  };

  const numericPrice = extractNumericPrice(product);
  const priceText =
    numericPrice != null && !isNaN(numericPrice)
      ? new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(numericPrice)
      : product.price
        ? `${product.price} €`
        : "—";

  return (
    <div className="big-card">
      {/* Mostra l'immagine del prodotto; se non esiste, usa un'immagine placeholder */}
      <img src={product.image} alt={product.name} />

      <div className="details">
        <h1>{product.name}</h1>
        <p>Categoria: {product.category}</p>
        <p>Prezzo: {priceText}</p>
        <p>{product.description}</p>

        {/* Controlli per la quantità da aggiungere al carrello */}
        <div className="quantity-controls">
          {/* Bottone per diminuire la quantità */}
          <button className="quantity-btn" onClick={decrease}>-</button>
          {/* Visualizza la quantità corrente */}
          <span className="quantity-number">{quantity}</span>
          {/* Bottone per aumentare la quantità */}
          <button className="quantity-btn" onClick={increase}>+</button>
        </div>

        {/* Bottone per aggiungere al carrello */}
        <button className="add-to-cart">Aggiungi al carrello</button>
      </div>
    </div>
  );
}
