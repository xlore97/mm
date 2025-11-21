import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderComplete() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
            }}
        >
            <div style={{ textAlign: "center" }}>
                <h2>Ordine completato</h2>
                <p>Grazie per il tuo acquisto! Il tuo ordine è stato ricevuto.</p>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        marginTop: 20,
                        padding: "10px 18px",
                        borderRadius: 8,
                        background: "#c52020",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Torna alla Home
                </button>
            </div>
        </div>
    );
}
