import Bestsellers from "../components/Bestsellers";
import Hero from "../components/Hero";
import LatestArrivals from "../components/LatestArrivals";
import PromoProducts from "../components/PromoProducts";

export default function Homepage() {
  return (
    <>
      <Hero />

      {/* mostra ultimi arrivi */}
      <section>
        <h2 className="homepage-section-titles">Novità dall'Oltretomba</h2>
        <LatestArrivals />
      </section>

      {/* mostra i bestseller */}
      <section>
        <h2 className="homepage-section-titles">Prediletti dai Non Morti</h2>
        <Bestsellers />
      </section>

      {/* mostra le promozioni */}
      <section>
        <h2 className="homepage-section-titles">Prezzi da Brividi</h2>
        <PromoProducts />
      </section>
    </>
  );
}
