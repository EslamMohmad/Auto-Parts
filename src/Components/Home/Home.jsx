import Attributes from "./Attributes";
import BannersGrid from "./BannersGrid";
import Navbar_Bottom from "./Navbar_Bottom";
import ProductsBanner from "./ProductsBanner";
const Home = () => {
  return (
    <section>
      <Navbar_Bottom />
      <BannersGrid />
      <Attributes />
      <ProductsBanner />
    </section>
  );
};

export default Home;
