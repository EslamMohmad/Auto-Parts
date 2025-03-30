import Attributes from "../Components/Home/Attributes";
import BannersGrid from "../Components/Home/BannersGrid";
import Brands from "../Components/Home/Brands";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import LastNews from "../Components/Home/LastNews";
import Navbar_Bottom from "../Components/Home/Navbar_Bottom";
import NewsLetter from "../Components/Home/NewsLetter";
import ProductsBanner from "../Components/Home/ProductsBanner";
import Services from "../Components/Home/Services";
import Testimonials from "../Components/Home/Testimonials";
const Home = () => {
  return (
    <>
      <Navbar_Bottom />
      <BannersGrid />
      <Attributes />
      <ProductsBanner />
      <Brands />
      <FeaturedProducts />
      <Services />
      <Testimonials />
      <LastNews />
      <NewsLetter />
    </>
  );
};

export default Home;
