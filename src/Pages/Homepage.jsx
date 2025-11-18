import Hero from "../components/Hero";
import LatestArrivals from "../components/LatestArrivals";
import Bestsellers from "../components/Bestsellers";
import PromoProducts from "../components/PromoProducts";

export default function Homepage() {
  return (
    <>
      <Hero />

      <section>
        <h2 className="homepage-section-titles">Novità dall'Oltretomba</h2>
        <LatestArrivals />
      </section>

      <section>
        <h2 className="homepage-section-titles">Prediletti dai Non Morti</h2>
        <Bestsellers />
      </section>

      <section>
        <h2 className="homepage-section-titles">Prezzi da Brividi</h2>
        <PromoProducts />
      </section>
    </>
  );
}