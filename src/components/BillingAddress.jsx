export default function BillingAddress() {
  return (
    <div className="address-container">
      <h2 className="address-text">Indirizzo di Fatturazione</h2>
      <form>
        {/* RIGA 1: Nome e Email */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="nome"
              id="name"
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
              required
              placeholder="dracu.love@bloodmail.com"
            />
          </div>
        </div>

        {/* RIGA 2: Indirizzo */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="address">Indirizzo</label>
            <input
              type="text"
              name="indirizzo"
              id="address"
              required
              placeholder="Via del Castello 66"
            />
          </div>
        </div>

        {/* RIGA 3: Città, CAP, Nazione */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">Città</label>
            <input
              type="text"
              name="citta"
              id="city"
              required
              placeholder="Mordor"
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">CAP</label>
            <input
              type="text"
              name="cap"
              id="zip"
              required
              pattern="\d{5}"
              placeholder="Es: 80100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Nazione</label>
            <select name="nazione" id="country" required>
              <option value="">Seleziona una nazione</option>
              <option value="italia">Italia</option>
              <option value="mordravia">Mordravia</option>
              <option value="cryptagonia">Cryptagonia</option>
              <option value="nightmerrica">Nightmerrica</option>
            </select>
          </div>
        </div>

        <button type="submit" className="checkout-btn">
          Continua
        </button>
      </form>
    </div>
  );
}
