import Bestsellers from "../components/Bestsellers";
import Hero from "../components/Hero";
import LatestArrivals from "../components/LatestArrivals";
import PromoProducts from "../components/PromoProducts";

export default function Homepage() {
  return (
    <>
      <Hero />
      {/* mostra ultimi arrivi */}
      <LatestArrivals />
      {/* mostra i bestseller */}
      <Bestsellers />
      {/* mostra le promozioni */}
      <PromoProducts />
    </>
  );
}
