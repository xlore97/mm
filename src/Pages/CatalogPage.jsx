import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";

import ProductsList from "../components/ProductsList";
import SearchBar from "../components/Searchbar";
import NoProductFound from "../components/NoProductFound";

import "./CatalogPage.css";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // stato UI ricerca / filtro / ordinamento / “doppia vista” griglia/lista
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // es. ["vampiri", "streghe"]
  const [sortMode, setSortMode] = useState("newest"); // newest | oldest | az | za | price-asc | price-desc
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // bounds globali dei prezzi e range attivo
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  // --- NUOVO: stato filtro promo ---
  const [onlyPromo, setOnlyPromo] = useState(false);

  // ================== HELPERS ==================

  const getProductPrice = (p) => Number(p.price ?? p.amount ?? 0) || 0;

  const getCategoryKey = (product) => {
    const c = String(product.category || "").toLowerCase();
    if (c.includes("vamp")) return "vampiri";
    if (c.includes("streg")) return "streghe";
    if (c.includes("licant")) return "licantropi";
    return "other";
  };

  const getProductTimestamp = (p) => {
    if (p.added_at) return new Date(p.added_at).getTime();
    if (p.created_at) return new Date(p.created_at).getTime();
    if (typeof p.id === "number") return p.id;
    const n = Number(p.id);
    return isNaN(n) ? 0 : n;
  };

  // === Inizializza stati dai query params ===
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const categories = searchParams.get("categories");
    const sort = searchParams.get("sort") || "newest";
    const price = searchParams.get("price"); // es "10-80"
    const promo = searchParams.get("promo"); // "true" o undefined

    setSearchText(search);

    if (categories) {
      setSelectedCategories(categories.split(","));
    }

    setSortMode(sort);

    if (price) {
      const [min, max] = price.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) setPriceRange({ min, max });
    }

    if (promo === "true") {
      setOnlyPromo(true);
    }
  }, []);

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
          console.warn("La risposta non contiene un array valido di prodotti:", res.data);
          list = [];
        }

        setProducts(list);

        // calcolo bounds prezzo globali
        if (list.length > 0) {
          const prices = list.map(getProductPrice).filter((v) => v >= 0);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setPriceBounds({ min, max });
          setPriceRange({ min, max });
        } else {
          setPriceBounds({ min: 0, max: 0 });
          setPriceRange({ min: 0, max: 0 });
        }
      } catch (err) {
        console.error("Errore caricamento prodotti:", err);
        const msg = err.response?.data?.message || "Impossibile caricare i prodotti.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // ================== FILTRAGGIO + ORDINAMENTO ==================

  const buildVisibleProducts = () => {
    let list = [...products];

    // filtro testo
    const term = searchText.trim().toLowerCase();
    if (term !== "") {
      list = list.filter((p) => {
        const name = String(p.name || "").toLowerCase();
        const desc = String(p.description || "").toLowerCase();
        return name.includes(term) || desc.includes(term);
      });
    }

    // filtro categorie
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(getCategoryKey(p)));
    }

    // filtro fascia prezzo
    if (priceBounds.max > priceBounds.min) {
      list = list.filter((p) => {
        const price = getProductPrice(p);
        return price >= priceRange.min && price <= priceRange.max;
      });
    }

    // --- NUOVO: filtro solo promo ---
    if (onlyPromo) {
      list = list.filter((p) => Number(p.promo ?? 0) > 0);
    }

    // ordinamento
    if (sortMode === "newest") list.sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
    else if (sortMode === "oldest") list.sort((a, b) => getProductTimestamp(a) - getProductTimestamp(b));
    else if (sortMode === "az")
      list.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), "it", { sensitivity: "base" })
      );
    else if (sortMode === "za")
      list.sort((a, b) =>
        String(b.name || "").localeCompare(String(a.name || ""), "it", { sensitivity: "base" })
      );
    else if (sortMode === "price-asc") list.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    else if (sortMode === "price-desc") list.sort((a, b) => getProductPrice(b) - getProductPrice(a));

    return list;
  };

  const visibleProducts = buildVisibleProducts();

  // === Sincronizza query string ===
  useEffect(() => {
    const params = {};

    if (searchText) params.search = searchText;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(",");
    if (sortMode !== "newest") params.sort = sortMode;
    if (priceRange.min !== priceBounds.min || priceRange.max !== priceBounds.max) {
      params.price = `${priceRange.min}-${priceRange.max}`;
    }
    if (onlyPromo) params.promo = "true";

    setSearchParams(params);
  }, [searchText, selectedCategories, sortMode, priceRange, priceBounds, onlyPromo, setSearchParams]);

  // ================== RENDER ==================
  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h1 className="catalog-title">La Nostra Collezione</h1>
        <p className="catalog-subtitle">Tutto ciò che un essere sovrannaturale potrebbe desiderare</p>
      </header>

      <SearchBar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        sortMode={sortMode}
        onSortChange={setSortMode}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        priceBounds={priceBounds}
        onlyPromo={onlyPromo}            
        onOnlyPromoChange={setOnlyPromo}  
      />

      {!loading && !error && visibleProducts.length === 0 && <NoProductFound />}
      {!loading && !error && visibleProducts.length > 0 && (
        <p className="catalog-count">{visibleProducts.length} prodotti da brivido</p>
      )}

      {loading && <p>Caricamento prodotti...</p>}
      {error && <p className="error-text">{error}</p>}

      <ProductsList products={visibleProducts} viewMode={viewMode} />
    </main>
  );
}
