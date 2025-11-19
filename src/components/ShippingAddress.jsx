import { useState } from "react";

export default function ShippingAddress() {
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);

  return (
    <div className="address-container">
      <h2 className="address-text">Indirizzo di Spedizione</h2>

      <div>
        <label>
          <input
            type="checkbox"
            checked={useDifferentAddress}
            onChange={() => setUseDifferentAddress(!useDifferentAddress)}
            className="checkbox"
          />
          <h4 className="inlineblock-text">
            Inserisci un indirizzo di spedizione diverso
          </h4>
        </label>
      </div>

      {useDifferentAddress && (
        <form>
          {/* RIGA 1: Nome e Email */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s_name">Nome</label>
              <input
                type="text"
                name="nome"
                id="s_name"
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
                required
                placeholder="dracu.love@bloodmail.com"
              />
            </div>
          </div>

          {/* RIGA 2: Indirizzo */}
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="s_address">Indirizzo</label>
              <input
                type="text"
                name="indirizzo"
                id="s_address"
                required
                placeholder="Via del Castello 66"
              />
            </div>
          </div>

          {/* RIGA 3: Città, CAP, Nazione */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="s_city">Città</label>
              <input
                type="text"
                name="citta"
                id="s_city"
                required
                placeholder="Mordor"
              />
            </div>
            <div className="form-group">
              <label htmlFor="s_zip">CAP</label>
              <input
                type="text"
                name="cap"
                id="s_zip"
                required
                placeholder="Es: 80100"
              />
            </div>
            <div className="form-group">
              <label htmlFor="s_country">Nazione</label>
              <select name="nazione" id="s_country" required>
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
  );
}
