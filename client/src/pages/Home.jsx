import Facility from "../views/Facility";
import Hero from "../views/Hero";
import Navbar from "../views/Navbar";
import RecommendedCarousel from "../views/RecommendedCarousel";
import SponserCarousel from "../views/SponserCarousel";

const Home = () => {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar />
      <Hero />
      <SponserCarousel />
      <RecommendedCarousel />
      <Facility />
    </div>
  );
};

export default Home;
