import React, { useState } from "react";
import "../assets/checkout-css/Checkout.css";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  // prendo dal contesto i prodotti e il totale del carrello
  const { cart, total } = useCart();

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  // stato per abilitare l'indirizzo di spedizione diverso
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);

  // stato per i dati di shipping (spedizione)
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  // funzione per aggiornare dinamicamente i campi del billing
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  // funzione per aggiornare dinamicamente i campi dello shipping
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  // funzione per completare l'ordine
  // previene il refresh della pagina al submit
  const handleCompleteOrder = (e) => {
    e.preventDefault(); 

    // controllo se il carrello è vuoto
    if (cart.length === 0) {
      alert("Il carrello è vuoto!");
      return;
    }

    // creo un oggetto con tutti i dati dell'ordine
    const order = {
      cart,
      total,
      billing: billingData,
      shipping: useDifferentAddress ? shippingData : billingData,
    };

    console.log("Ordine completato:", order); // simula invio al backend
    alert("Ordine completato! Controlla console.");
  };

  return (
    <div className="checkout-container">
      {/* COLONNA SINISTRA: prodotti + indirizzi */}
      <div className="col-left-checkout">
        {/* lista prodotti dal carrello */}
        {cart.length > 0 ? (
          cart.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <p>Il carrello è vuoto</p>
        )}

        {/* ================== BILLING ADDRESS ================== */}
        <div className="address-container">
          <h2 className="address-text">Indirizzo di Fatturazione</h2>
          <form>
            {/* riga 1: nome e email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={billingData.name} // binding dinamico
                  onChange={handleBillingChange} // aggiorna lo stato
                  required // validazione
                  placeholder="Es. Vlad Dracula"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={billingData.email}
                  onChange={handleBillingChange}
                  required
                  placeholder="dracu.love@bloodmail.com"
                />
              </div>
            </div>

            {/* riga 2: indirizzo */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="address">Indirizzo</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={billingData.address}
                  onChange={handleBillingChange}
                  required
                  placeholder="Via del Castello 66"
                />
              </div>
            </div>

            {/* riga 3: città, CAP, nazione */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Città</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={billingData.city}
                  onChange={handleBillingChange}
                  required
                  placeholder="Mordor"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">CAP</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={billingData.zip}
                  onChange={handleBillingChange}
                  required
                  pattern="\d{5}" // solo 5 numeri
                  placeholder="Es: 80100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Nazione</label>
                <select
                  name="country"
                  id="country"
                  value={billingData.country}
                  onChange={handleBillingChange}
                  required
                >
                  <option value="">Seleziona una nazione</option>
                  <option value="italia">Italia</option>
                  <option value="mordravia">Mordravia</option>
                  <option value="cryptagonia">Cryptagonia</option>
                  <option value="nightmerrica">Nightmerrica</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* ================== SHIPPING ADDRESS ================== */}
        <div className="address-container">
          <h2 className="address-text">Indirizzo di Spedizione</h2>
          <div>
            {/* checkbox per abilitare un indirizzo di spedizione diverso */}
            <label>
              <input
                type="checkbox"
                checked={useDifferentAddress}
                onChange={() => setUseDifferentAddress((prev) => !prev)}
                className="checkbox"
              />
              <h4 className="inlineblock-text">
                Inserisci un indirizzo di spedizione diverso
              </h4>
            </label>
          </div>

          {/* form di shipping solo se spuntato */}
          {useDifferentAddress && (
            <form>
              {/* riga 1: nome e email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="s_name">Nome</label>
                  <input
                    type="text"
                    name="name"
                    id="s_name"
                    value={shippingData.name}
                    onChange={handleShippingChange}
                    required
                    placeholder="Es. Vlad Dracula"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="s_email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="s_email"
                    value={shippingData.email}
                    onChange={handleShippingChange}
                    required
                    placeholder="dracu.love@bloodmail.com"
                  />
                </div>
              </div>

              {/* riga 2: indirizzo */}
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="s_address">Indirizzo</label>
                  <input
                    type="text"
                    name="address"
                    id="s_address"
                    value={shippingData.address}
                    onChange={handleShippingChange}
                    required
                    placeholder="Via del Castello 66"
                  />
                </div>
              </div>

              {/* riga 3: città, CAP, nazione */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="s_city">Città</label>
                  <input
                    type="text"
                    name="city"
                    id="s_city"
                    value={shippingData.city}
                    onChange={handleShippingChange}
                    required
                    placeholder="Mordor"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="s_zip">CAP</label>
                  <input
                    type="text"
                    name="zip"
                    id="s_zip"
                    value={shippingData.zip}
                    onChange={handleShippingChange}
                    required
                    placeholder="Es: 80100"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="s_country">Nazione</label>
                  <select
                    name="country"
                    id="s_country"
                    value={shippingData.country}
                    onChange={handleShippingChange}
                    required
                  >
                    <option value="">Seleziona una nazione</option>
                    <option value="italia">Italia</option>
                    <option value="mordravia">Mordravia</option>
                    <option value="cryptagonia">Cryptagonia</option>
                    <option value="nightmerrica">Nightmerrica</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* COLONNA DESTRA: riepilogo ordine */}
      <div className="col-right-checkout">
        <div className="summary-container">
          <h2>Riepilogo Ordine</h2>
          <div className="summary-row">
            <h4>Totale:</h4>
            <h3 className="total">€{total}</h3>
          </div>
          {/* bottone completa ordine */}
          <button className="checkout-btn" onClick={handleCompleteOrder}>
            Completa Ordine
          </button>
        </div>
      </div>
    </div>
  );
}
