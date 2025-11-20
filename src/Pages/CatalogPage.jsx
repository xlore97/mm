import { useEffect, useState } from "react";
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

  // ================== FETCH PRODOTTI ==================
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get("http://localhost:3000/api/products");
        console.log("CatalogPage - prodotti:", res.data);

        let list = Array.isArray(res.data) ? res.data : res.data.data;

        if (!Array.isArray(list)) {
          console.warn(
            "La risposta non contiene un array valido di prodotti:",
            res.data
          );
          list = [];
        }

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
  }, []);

  // ==================  FILTRO/ORDINE ==================

  // Categoria del prodotto
  const getCategoryKey = (product) => {
    const c = String(product.category || "").toLowerCase();
    if (c.includes("vamp")) return "vampire"; // Vampiri
    if (c.includes("streg")) return "witch"; // Streghe
    if (c.includes("licant") || c.includes("lycan")) return "lycan"; // Licantropi
    return "other";
  };

  // Estrae una "data" di riferimento per l’ordinamento
  const getProductTimestamp = (p) => {
    if (p.added_at) return new Date(p.added_at).getTime();
    if (p.created_at) return new Date(p.created_at).getTime();
    // fallback: usa l’id (più alto = più recente)
    if (typeof p.id === "number") return p.id;
    const n = Number(p.id);
    return isNaN(n) ? 0 : n;
  };

  // ================== FILTRAGGIO + ORDINAMENTO ==================

  const buildVisibleProducts = () => {
    let list = [...products];

    // filtro testo (nome + descrizione)
    const term = searchText.trim().toLowerCase();
    if (term !== "") {
      list = list.filter((p) => {
        const name = String(p.name || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        return name.includes(term) || desc.includes(term);
      });
    }

    // filtro categoria
    if (selectedCategory !== "all") {
      list = list.filter((p) => getCategoryKey(p) === selectedCategory);
    }

    // ordinamento
    if (sortMode === "newest") {
      list.sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
    } else if (sortMode === "oldest") {
      list.sort((a, b) => getProductTimestamp(a) - getProductTimestamp(b));
    } else if (sortMode === "az") {
      list.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), "it", {
          sensitivity: "base",
        })
      );
    }

    return list;
  };

  const visibleProducts = buildVisibleProducts();

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

      {/* num prodotti che escono con la ricerca effettuata */}
      {!loading && !error && (
        <p className="catalog-count">
          {visibleProducts.length} prodotti da brivido
        </p>
      )}

      {loading && <p>Caricamento prodotti...</p>}
      {error && <p className="error-text">{error}</p>}

      <ProductsList products={visibleProducts} viewMode={viewMode} />
    </main>
  );
}
