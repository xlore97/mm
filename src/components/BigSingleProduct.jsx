export default function BigSingleProduct({
  product,
  quantity,
  increase,
  decrease,
}) {
  // Se il prodotto non è ancora disponibile (ad esempio in fase di caricamento da backend), mostra un messaggio di caricamento
  if (!product) return <p>Loading...</p>;

  return (
    <div className="big-card">
      {/* Mostra l'immagine del prodotto; se non esiste, usa un'immagine placeholder */}
      <img src={product.image} alt={product.name} />

      <div className="details">
        <h1>{product.name}</h1>
        <p>Categoria: {product.category}</p>
        <p>Prezzo: {product.price} €</p>
        <p>{product.description}</p>

        {/* Controlli per la quantità da aggiungere al carrello */}
        <div className="quantity-controls">
          {/* Bottone per diminuire la quantità */}
          <button onClick={decrease}>-</button>
          {/* Visualizza la quantità corrente */}
          <span>{quantity}</span>
          {/* Bottone per aumentare la quantità */}
          <button onClick={increase}>+</button>
        </div>

        {/* Bottone per aggiungere al carrello */}
        <button className="add-to-cart">Aggiungi al carrello</button>
      </div>
    </div>
  );
}
