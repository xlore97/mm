import ProductsList from "../components/ProductsList";
import SearchBar from "../components/Searchbar";

export default function CatalogPage() {
  return (
    <>
      {/* barra di ricerca per filtrare la lista dei prodotti */}
      <SearchBar />
      {/* lista dei prodotti */}
      <ProductsList />
    </>
  );
}
