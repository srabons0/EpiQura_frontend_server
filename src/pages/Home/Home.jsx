import ShoppingCart from "../../components/ui/ShoppingCart";
import useScrollToTop from "../../components/ui/useScrollToTop";
import Categories from "../Categories/Categories";
import TopFoodList from "../Foods/TopFoodList";
import AboutDhaka from "./AboutDhaka";
import AboutUs from "./AboutUs";
import AppDownload from "./AppDownload";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import HowItWorks from "./HowItWorks";
import Newsletter from "./Newsletter";
import SpecialOffers from "./SpecialOffers";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  useScrollToTop();
  return (
    <div className="relative w-full max-w-fit overflow-hidden">
      <ShoppingCart></ShoppingCart>
      <Banner></Banner>
      <Categories></Categories>
      <TopFoodList></TopFoodList>
      <BestSellers></BestSellers>
      <SpecialOffers></SpecialOffers>
      <HowItWorks></HowItWorks>
      <AboutDhaka></AboutDhaka>
      <AboutUs></AboutUs>
      <Testimonials></Testimonials>
      <AppDownload></AppDownload>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
