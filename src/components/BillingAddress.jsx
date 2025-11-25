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
          placeholder="Es. Vlad Dracula"
          className={invalidFields.includes("name") ? "invalid-field" : ""}
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
          placeholder="dracu.love@bloodmail.com"
          className={invalidFields.includes("email") ? "invalid-field" : ""}
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
          placeholder="Via del Castello 66"
          className={invalidFields.includes("address") ? "invalid-field" : ""}
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
          placeholder="Mordor"
          className={invalidFields.includes("city") ? "invalid-field" : ""}
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
          placeholder="Es: 80100"
          className={invalidFields.includes("zip") ? "invalid-field" : ""}
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