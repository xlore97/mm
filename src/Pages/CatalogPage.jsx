import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // 🔹 MODIFICA: per query params
import axios from "axios";

import ProductsList from "../components/ProductsList";
import SearchBar from "../components/Searchbar";

import "./CatalogPage.css";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // stato UI ricerca / filtro / ordinamento / “doppia vista” griglia/lista
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // all | vampire | witch | lycan
  const [sortMode, setSortMode] = useState("newest"); // newest | oldest | az
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // 🔹 MODIFICA: hook per gestire query params
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 MODIFICA: inizializza stati dai query params al mount
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "newest";

    setSearchText(search);
    setSelectedCategory(category);
    setSortMode(sort);
  }, []);

  // ================== FETCH PRODOTTI ==================
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const params = {
          search: searchText || undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          sort: sortMode,
        };

        const res = await axios.get("http://localhost:3000/api/products", { params });
        console.log("CatalogPage - prodotti:", res.data);

        const list = Array.isArray(res.data.data) ? res.data.data : [];
        setProducts(list);
      } catch (err) {
        console.error("Errore caricamento prodotti:", err);
        const msg =
          err.response?.data?.message || "Impossibile caricare i prodotti.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchText, selectedCategory, sortMode]);

  // 🔹 MODIFICA: aggiorna URL quando cambiano ricerca/categoria/ordinamento
  useEffect(() => {
    const params = {};
    if (searchText) params.search = searchText;
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (sortMode !== "newest") params.sort = sortMode;

    setSearchParams(params);
  }, [searchText, selectedCategory, sortMode, setSearchParams]);

  // ================== RENDER ==================
  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h1 className="catalog-title">La Nostra Collezione</h1>
        <p className="catalog-subtitle">
          Tutto ciò che un essere sovrannaturale potrebbe desiderare
        </p>
      </header>

      <SearchBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortMode={sortMode}
        onSortChange={setSortMode}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {!loading && !error && (
        <p className="catalog-count">
          {products.length} prodotti da brivido
        </p>
      )}

      {loading && <p>Caricamento prodotti...</p>}
      {error && <p className="error-text">{error}</p>}

      <ProductsList products={products} viewMode={viewMode} />
    </main>
  );
}
