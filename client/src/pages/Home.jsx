import { useEffect } from "react";
import BookOnSale from "../views/BookOnSale";
import Facility from "../views/Facility";
import Hero from "../views/Hero";
import Navbar from "../views/Navbar";
import RecommendedCarousel from "../views/RecommendedCarousel";
import SponserCarousel from "../views/SponserCarousel";
import useAuthStore from "../zustand-store/authStore";
import { getHome } from "../utils/getApi";
import FeaturedCarouselSection from "../views/FeaturedCarouselSection";

const Home = () => {
  const { setLogin, isLoggedIn } = useAuthStore();

  useEffect(() => {
    async function getHomeData() {
      try {
        const res = await getHome();
        if (res.data.message) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error(error);
        setLogin(false);
      }
    }
    getHomeData();
  }, []);
  return (
    <div className="w-screen overflow-hidden">
      <Hero />
      <SponserCarousel />
      <RecommendedCarousel />
      <Facility />
      <BookOnSale />
      <FeaturedCarouselSection />
    </div>
  );
};

export default Home;
