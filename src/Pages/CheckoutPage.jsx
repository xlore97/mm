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
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);

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

    let missingFields = [];

    // Billing
    if (!billingData.name.trim()) missingFields.push("name");
    if (!billingData.email.trim()) missingFields.push("email");
    if (!billingData.address.trim()) missingFields.push("address");
    if (!billingData.city.trim()) missingFields.push("city");
    if (!/^\d{5}$/.test(billingData.zip)) missingFields.push("zip");
    if (!billingData.country) missingFields.push("country");

    // Shipping (solo se è diverso)
    if (useDifferentAddress) {
      if (!shippingData.name.trim()) missingFields.push("s_name");
      if (!shippingData.email.trim()) missingFields.push("s_email");
      if (!shippingData.address.trim()) missingFields.push("s_address");
      if (!shippingData.city.trim()) missingFields.push("s_city");
      if (!/^\d{5}$/.test(shippingData.zip)) missingFields.push("s_zip");
      if (!shippingData.country) missingFields.push("s_country");
    }

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      const firstField = document.getElementById(missingFields[0]);
      firstField?.focus();
      setFeedbackMessage("Compila tutti i campi obbligatori prima di procedere!");
      setTimeout(() => setFeedbackMessage(""), 3000);
      return;
    }

    setInvalidFields([]);
    setShowPayment(true);
  };

  // Coupon
  const handleApplyCoupon = async (e) => {
    e?.preventDefault();
    setCouponError("");
    setAppliedCoupon(null);

    const code = (couponCode || "").trim().toUpperCase();
    if (!code) {
      setCouponError("Inserisci un codice coupon.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/api/coupons/validate?code=${code}`);
      const data = res.data.data;

      if (!data.valid) {
        setCouponError(data.message || "Coupon non valido.");
        return;
      }

      setAppliedCoupon({ code, type: "percent", value: data.discount });
    } catch (err) {
      console.error(err);
      setCouponError("Errore durante la verifica del coupon.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
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

    const subtotal = Number(total) || 0;
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percent") discount = subtotal * (appliedCoupon.value / 100);
      else if (appliedCoupon.type === "fixed") discount = appliedCoupon.value;
    }
    const subtotalAfterDiscount = Math.max(0, subtotal - discount);
    const shippingCost =
      appliedCoupon && appliedCoupon.type === "shipping" ? 0 : subtotalAfterDiscount > 99 ? 0 : 4.99;

    const payload = {
      total_price: Number((subtotalAfterDiscount + shippingCost).toFixed(2)),
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
      .then(() => {
        clearCart();
        navigate("/order-complete");
      })
      .catch((err) => {
        console.error("Errore creazione ordine:", err);
        alert("Errore nella creazione dell'ordine. Controlla console.");
      });
  };

  // Calcoli prezzi
  const subtotal = Number(total) || 0;
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") discountAmount = subtotal * (appliedCoupon.value / 100);
    else if (appliedCoupon.type === "fixed") discountAmount = appliedCoupon.value;
  }
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const shippingCost = appliedCoupon && appliedCoupon.type === "shipping" ? 0 : subtotalAfterDiscount > 99 ? 0 : 4.99;
  const finalTotal = Number((subtotalAfterDiscount + shippingCost).toFixed(2));

  return (
    <>
      <div className="checkout-container">
        <div className="col-left-checkout">
          {cart.length > 0 ? (
            <>
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
                        className={invalidFields.includes("name") ? "invalid-field" : ""}
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
                        className={invalidFields.includes("email") ? "invalid-field" : ""}
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
                        className={invalidFields.includes("address") ? "invalid-field" : ""}
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
                        className={invalidFields.includes("city") ? "invalid-field" : ""}
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
                        className={invalidFields.includes("zip") ? "invalid-field" : ""}
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
                        className={invalidFields.includes("country") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_name") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_email") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_address") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_city") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_zip") ? "invalid-field" : ""}
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
                          className={invalidFields.includes("s_country") ? "invalid-field" : ""}
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
                <h4>Prezzo prodotti:</h4>
                <h4>€{subtotal.toFixed(2)}</h4>
              </div>

              {/* Coupon */}
              <div className="coupon-section">
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon}>
                    <input
                      type="text"
                      placeholder="Inserisci codice coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="btn">Applica</button>
                  </form>
                ) : (
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ fontSize: 14, color: "#bfe3c6" }}>
                      Coupon applicato: <strong>{appliedCoupon.code}</strong>
                    </div>
                    <button onClick={handleRemoveCoupon} style={{ padding: "8px 12px" }}>
                      Rimuovi
                    </button>
                  </div>
                )}

                {couponError && <div style={{ color: "#f56565", marginTop: 8 }}>{couponError}</div>}
              </div>

              {subtotalAfterDiscount > 99 && (
                <div className="free-shipping-bar">Hai diritto alla spedizione gratuita</div>
              )}

              <div className="summary-row shipping-row">
                <h4>Spedizione:</h4>
                <h4>€{shippingCost.toFixed(2)}</h4>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row">
                  <h4>Sconto coupon:</h4>
                  <h4>-€{discountAmount.toFixed(2)}</h4>
                </div>
              )}

              <div className="summary-row">
                <h4>Totale:</h4>
                <h3 className="total">€{finalTotal.toFixed(2)}</h3>
              </div>

              <button
                className="checkout-btn btn"
                onClick={handleCompleteOrder}
              >
                Completa Ordine
              </button>
            </div>
          </div>
        )}
      </div>

      {feedbackMessage && (
        <div className={`feedback-toast ${feedbackMessage ? "show" : ""}`}>
          {feedbackMessage}
        </div>
      )}

      {showPayment && (
        <PaymentModal
          amount={finalTotal}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccessAndRedirect}
        />
      )}
    </>
  );
}

