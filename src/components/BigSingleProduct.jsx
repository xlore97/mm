import TemporaryPic from "../assets/images/test-img.avif";

export default function BigSingleProduct({ quantity, increase, decrease }) {
  return (
    <>
      <div className="box-singolo-prodotto">
        {/* IMG */}
        <div className="single-img-box">
          <img src={TemporaryPic} alt="Prodotto provvisorio" />
        </div>

        {/* TXT */}
        <div className="single-info-box">
          <h2>Nome prodotto</h2>
          <p>
            Descrizione prodotto: Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>

          <span className="price">$2499.99</span>

          {/* Quantity */}
          <div className="quantity-box">
            <span>Quantity:</span>
            <button className="quantity-btn" onClick={decrease}>
              −
            </button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-btn" onClick={increase}>
              +
            </button>
          </div>

          <button className="add-to-cart">🛒 Aggiungi al Carrello</button>
        </div>
      </div>
    </>
  );
}
