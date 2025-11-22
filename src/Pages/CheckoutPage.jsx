import React, { useState, useEffect } from "react";
import "../assets/checkout-css/Checkout.css";
import PaymentModal from "../components/PaymentModal";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [useDifferentAddress, setUseDifferentAddress] = useState(false);

  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [canCompleteOrder, setCanCompleteOrder] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Aggiorna billing
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  // Aggiorna shipping
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  // Controlla validità form
  useEffect(() => {
    const billingComplete =
      billingData.name.trim() &&
      billingData.email.trim() &&
      billingData.address.trim() &&
      billingData.city.trim() &&
      /^\d{5}$/.test(billingData.zip) &&
      billingData.country;

    const shippingComplete = useDifferentAddress
      ? shippingData.name.trim() &&
        shippingData.email.trim() &&
        shippingData.address.trim() &&
        shippingData.city.trim() &&
        /^\d{5}$/.test(shippingData.zip) &&
        shippingData.country
      : true;

    setCanCompleteOrder(billingComplete && shippingComplete && cart.length > 0);
  }, [billingData, shippingData, useDifferentAddress, cart]);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!canCompleteOrder) return;
    setShowPayment(true);
  };

  const handlePaymentSuccessAndRedirect = (paymentInfo) => {
    const billing = {
      name: billingData.name,
      street: billingData.address,
      cap: billingData.zip,
      city: billingData.city,
      province: billingData.country,
      country: billingData.country,
    };

    const shipping = useDifferentAddress
      ? {
          name: shippingData.name,
          street: shippingData.address,
          cap: shippingData.zip,
          city: shippingData.city,
          province: shippingData.country,
          country: shippingData.country,
        }
      : billing;

    const items = cart.map((it) => ({
      product_id: it.id,
      quantity: it.quantity,
      regular_price: Number(it.price),
      special_price: null,
      product_name: it.name,
    }));

    const payload = {
      total_price: Number(total),
      payment_method: "card",
      username: billingData.name,
      user_email: billingData.email,
      billing_address: billing,
      shipping_address: shipping,
      items,
    };

    setShowPayment(false);

    axios
      .post("http://localhost:3000/api/orders", payload)
      .then((res) => {
        clearCart();
        navigate("/order-complete");
      })
      .catch((err) => {
        console.error("Errore creazione ordine:", err);
        alert("Errore nella creazione dell'ordine. Controlla console.");
      });
  };

  return (
    <>
      <div className="checkout-container">
        <div className="col-left-checkout">
          {cart.length > 0 ? (
            <>
              {/* Carrello */}
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}

              {/* Billing Address */}
              <div className="address-container">
                <h2 className="address-text">Indirizzo di Fatturazione</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nome</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={billingData.name}
                        onChange={handleBillingChange}
                        required
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
                        pattern="\d{5}"
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

              {/* Shipping Address */}
              <div className="address-container">
                <h2 className="address-text">Indirizzo di Spedizione</h2>
                <label>
                  <input
                    type="checkbox"
                    checked={useDifferentAddress}
                    onChange={() => setUseDifferentAddress((prev) => !prev)}
                    className="checkbox"
                  />
                  <span className="inlineblock-text">
                    Inserisci un indirizzo di spedizione diverso
                  </span>
                </label>

                {useDifferentAddress && (
                  <form>
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
            </>
          ) : (
            <div className="empty-cart-wrapper">
              <h2>Carrello vuoto.</h2>
              <h3>Non far piangere i non-morti della logistica.</h3>
              <Link to="/products">Acquista Ora!</Link>
            </div>
          )}
        </div>

        {/* Riepilogo ordine */}
        {cart.length > 0 && (
          <div className="col-right-checkout">
            <div className="summary-container">
              <h2>Riepilogo Ordine</h2>
              <div className="summary-row">
                <h4>Totale:</h4>
                <h3 className="total">€{total}</h3>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCompleteOrder}
                disabled={!canCompleteOrder}
              >
                Completa Ordine
              </button>
            </div>
          </div>
        )}
      </div>

      {showPayment && (
        <PaymentModal
          amount={total}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccessAndRedirect}
        />
      )}
    </>
  );
}
