import React, { useState } from "react";

export default function PaymentModal({ onClose, onSuccess, amount }) {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");

    const validate = () => {
        const num = cardNumber.replace(/\s+/g, "");
        if (!/^\d{13,19}$/.test(num)) return "Numero carta non valido";
        if (!cardName.trim()) return "Intestatario obbligatorio";

        // Accept MM/YY or MM/YYYY and check expiration
        const m = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
        if (!m) return "Data scadenza non valida";

        const month = parseInt(m[1], 10);
        let year = parseInt(m[2], 10);
        if (String(m[2]).length === 2) {
            // Convert 2-digit year to full year (assume 2000-2099)
            year += 2000;
        }

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 0-based

        // If expiry year < current year => expired
        // If same year and expiry month < current month => expired
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return "Carta scaduta";
        }

        if (!/^\d{3,4}$/.test(cvv)) return "CVV non valido";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        // Simula la richiesta di pagamento
        const payment = { cardNumber, cardName, expiry, cvv, amount };
        console.log("Pagamento inviato:", payment);
        onSuccess(payment);
    };

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal">
                <button className="modal-close" onClick={onClose} aria-label="Chiudi">
                    ×
                </button>
                <h3>Dettagli Carta di Credito</h3>
                <form onSubmit={handleSubmit} className="payment-form">
                    <label>
                        Numero Carta
                        <input
                            inputMode="numeric"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </label>

                    <label>
                        Intestatario (Nome e Cognome)
                        <input
                            placeholder="Mario Rossi"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                    </label>

                    <div className="form-row">
                        <label className="expiry-label">
                            Scadenza (MM/YY)
                            <input
                                className="expiry-input"
                                placeholder="05/26"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                        </label>
                        <label className="cvv-label">
                            CVV
                            <input
                                className="cvv-input"
                                inputMode="numeric"
                                placeholder="123"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="payment-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Annulla
                        </button>
                        <button type="submit" className="checkout-btn">
                            Paga €{amount}
                        </button>
                    </div>

                    {error && <div className="payment-error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
