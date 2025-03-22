import Attributes from "./Attributes";
import BannersGrid from "./BannersGrid";
import Brands from "./Brands";
import FeaturedProducts from "./FeaturedProducts";
import LastNews from "./LastNews";
import Navbar_Bottom from "./Navbar_Bottom";
import NewsLetter from "./NewsLetter";
import ProductsBanner from "./ProductsBanner";
import Services from "./Services";
import Testimonials from "./Testimonials";
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
