import { useState } from "react";
import "./Searchbar.css";
import PriceRange from "./PriceRange";

export default function SearchBar({
  // testo di ricerca
  searchText = "",
  onSearchTextChange = () => {},
  // categorie selezionate
  selectedCategories = [],
  onCategoriesChange = () => {},
  // ordinamento
  sortMode = "newest",
  onSortChange = () => {},
  // vista griglia / lista
  viewMode = "grid",
  onViewModeChange = () => {},
  // range prezzi attivo (viene dal parent)
  priceRange = { min: 0, max: 0 },
  onPriceRangeChange = () => {},
  // limiti min/max disponibili sui prodotti (vengono dal parent)
  priceBounds = { min: 0, max: 0 },
}) {
  const isGrid = viewMode === "grid";

  // categorie possibili : vampiri | streghe | licantropi
  const categoryOptions = [
    { value: "vampiri", label: "Vampiri" },
    { value: "streghe", label: "Streghe" },
    { value: "licantropi", label: "Licantropi" },
  ];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // ---------- CATEGORIE ----------

  // toggle singola categoria (multi-select)
  const handleCategoryToggle = (value) => {
    if (selectedCategories.includes(value)) {
      onCategoriesChange(selectedCategories.filter((v) => v !== value));
    } else {
      onCategoriesChange([...selectedCategories, value]);
    }
  };

  // “Tutte le categorie” = nessun filtro applicato → array vuoto
  const handleAllCategoriesToggle = () => {
    onCategoriesChange([]);
  };

  return (
    <section className="searchbar-wrapper">
      {/* -------- INPUT RICERCA -------- */}
      <div className="search-row">
        <div className="search-input-wrapper">
          <span className="material-symbols-outlined search-input-icon">
            search
          </span>
          <input
            type="text"
            placeholder="Cerca prodotti..."
            className="search-input"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
          />
        </div>
      </div>

      {/* =============== CATEGORIE ================= */}
      <div className="filter-section">
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => setIsCategoryOpen((open) => !open)}
        >
          <span>Categorie</span>
          <span
            className={`price-range-arrow ${isCategoryOpen ? "is-open" : ""}`}
          >
            ▾
          </span>
        </button>

        {isCategoryOpen && (
          <div className="category-panel">
            <div className="category-row">
              {/* Tutte le categorie con quadratino */}
              <label
                className={`category-filter ${
                  selectedCategories.length === 0 ? "is-active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={handleAllCategoriesToggle}
                />
                <span className="category-filter-label">
                  Tutte le categorie
                </span>
              </label>

              {/* Categorie singole */}
              {categoryOptions.map((opt) => {
                const active = selectedCategories.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`category-filter ${active ? "is-active" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => handleCategoryToggle(opt.value)}
                    />
                    <span className="category-filter-label">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =============== FASCIA DI PREZZO (con slider) ================= */}
      <div className="filter-section">
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => setIsPriceOpen((open) => !open)}
        >
          <span>Fascia di prezzo</span>
          <span className={`price-range-arrow ${isPriceOpen ? "is-open" : ""}`}>
            ▾
          </span>
        </button>

        {isPriceOpen && priceBounds.max > priceBounds.min && (
          <PriceRange
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
            priceBounds={priceBounds}
          />
        )}
      </div>

      {/* =============== ORDINAMENTO + VISTA ================= */}
      <div className="search-row search-sort-row">
        <span className="search-sort-label">Ordina per:</span>

        <button
          className={`sort-button ${sortMode === "newest" ? "is-active" : ""}`}
          onClick={() => onSortChange("newest")}
        >
          Nuovi
        </button>

        <button
          className={`sort-button ${sortMode === "oldest" ? "is-active" : ""}`}
          onClick={() => onSortChange("oldest")}
        >
          Più vecchi
        </button>

        <button
          className={`sort-button ${sortMode === "az" ? "is-active" : ""}`}
          onClick={() => onSortChange("az")}
        >
          A-Z
        </button>

        <button
          className={`sort-button ${sortMode === "za" ? "is-active" : ""}`}
          onClick={() => onSortChange("za")}
        >
          Z-A
        </button>

        <button
          className={`sort-button ${
            sortMode === "price-asc" ? "is-active" : ""
          }`}
          onClick={() => onSortChange("price-asc")}
        >
          Prezzo ↑
        </button>

        <button
          className={`sort-button ${
            sortMode === "price-desc" ? "is-active" : ""
          }`}
          onClick={() => onSortChange("price-desc")}
        >
          Prezzo ↓
        </button>

        <button
          className="view-toggle-btn-single"
          onClick={() => onViewModeChange(isGrid ? "list" : "grid")}
        >
          <span className="material-symbols-outlined">
            {isGrid ? "view_list" : "grid_view"}
          </span>
          <span>{isGrid ? "Lista" : "Griglia"}</span>
        </button>
      </div>
    </section>
  );
}
