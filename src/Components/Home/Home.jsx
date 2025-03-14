import Attributes from "./Attributes";
import BannersGrid from "./BannersGrid";
import Brands from "./Brands";
import FeaturedProducts from "./FeaturedProducts";
import Navbar_Bottom from "./Navbar_Bottom";
import ProductsBanner from "./ProductsBanner";
import Services from "./Services";
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
    </>
  );
};

export default Home;
