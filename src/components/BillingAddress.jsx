import { useState } from "react";

export default function BillingAddress() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [citta, setCitta] = useState("");
  const [cap, setCap] = useState("");
  const [nazione, setNazione] = useState("");

  const isFormComplete = () => {
    return (
      nome.trim() &&
      email.trim() &&
      indirizzo.trim() &&
      citta.trim() &&
      /^\d{5}$/.test(cap) &&
      nazione
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete()) {
      console.log("Form incompleto. Inserisci tutti i dati!");
      return;
    }
    console.log("Ordine completato!", {
      nome,
      email,
      indirizzo,
      citta,
      cap,
      nazione,
    });
    alert("Ordine completato!");
  };

  return (
    <div className="address-container">
      <h2>Indirizzo di Fatturazione</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Indirizzo"
          value={indirizzo}
          onChange={(e) => setIndirizzo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Città"
          value={citta}
          onChange={(e) => setCitta(e.target.value)}
        />
        <input
          type="text"
          placeholder="CAP (5 cifre)"
          value={cap}
          onChange={(e) => setCap(e.target.value)}
        />
        <select value={nazione} onChange={(e) => setNazione(e.target.value)}>
          <option value="">Seleziona nazione</option>
          <option value="italia">Italia</option>
          <option value="mordravia">Mordravia</option>
          <option value="cryptagonia">Cryptagonia</option>
          <option value="nightmerrica">Nightmerrica</option>
        </select>

        <button type="submit" disabled={!isFormComplete()}>
          Continua
        </button>
      </form>
    </div>
  );
}
