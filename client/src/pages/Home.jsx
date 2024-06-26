import { useEffect } from "react";
import BookOnSale from "../views/BookOnSale";
import Facility from "../views/Facility";
import Hero from "../views/Hero";
import RecommendedCarousel from "../views/RecommendedCarousel";
import SponserCarousel from "../views/SponserCarousel";
import useAuthStore from "../zustand-store/authStore";
import FeaturedCarouselSection from "../views/FeaturedCarouselSection";
import { fetchUserData } from "../utils/fetchUserData";

const Home = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    fetchUserData(setUser);
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
