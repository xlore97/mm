{
  /* Shipping Address */
}
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
            placeholder="Es. Vlad Dracula"
            className={invalidFields.includes("s_name") ? "invalid-field" : ""}
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
            placeholder="dracu.love@bloodmail.com"
            className={invalidFields.includes("s_email") ? "invalid-field" : ""}
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
            placeholder="Via del Castello 66"
            className={
              invalidFields.includes("s_address") ? "invalid-field" : ""
            }
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
            placeholder="Mordor"
            className={invalidFields.includes("s_city") ? "invalid-field" : ""}
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
            placeholder="Es: 80100"
            className={invalidFields.includes("s_zip") ? "invalid-field" : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="s_country">Nazione</label>
          <select
            name="country"
            id="s_country"
            value={shippingData.country}
            onChange={handleShippingChange}
            className={
              invalidFields.includes("s_country") ? "invalid-field" : ""
            }
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
</div>;
