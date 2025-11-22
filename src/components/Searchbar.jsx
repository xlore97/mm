import "./Searchbar.css";

export default function SearchBar({
  searchText = "",
  onSearchTextChange = () => {},
  selectedCategory = "all",
  onCategoryChange = () => {},
  sortMode = "newest",
  onSortChange = () => {},
  viewMode = "grid",
  onViewModeChange = () => {},
}) {
  const isGrid = viewMode === "grid";

  return (
    <section className="searchbar-wrapper">
      {/* -------- Riga input + select categorie -------- */}
      <div className="search-row">
        <div className="search-input-wrapper">
          <span className="material-symbols-outlined search-input-icon">
            search
          </span>
          <input
            type="text"
            placeholder="cerca prodotti..."
            className="search-input"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
          />
        </div>

        {/* -------- selezione categoria vampiro | strega | licantropo -------- */}
        <div className="search-select-wrapper">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Tutte le Categorie</option>
            <option value="vampire">Vampiro</option>
            <option value="witch">Strega</option>
            <option value="lycan">Licantropo</option>
          </select>
        </div>
      </div>

      {/* -------- Riga ordinamento -------- */}
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
      </div>

      {/* -------- vista griglia/lista -------- */}
      <div className="search-row view-row">
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
