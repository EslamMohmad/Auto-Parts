import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WrapperComponent from "./Components/WrapperComponent";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Shop_Category from "./Pages/Shop_Category";
import Shop_Category_product from "./Pages/Shop_Category_product";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Auto-Parts" element={<WrapperComponent />}>
          <Route path="" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop_Category />} />
          <Route
            path="shop/:category/:product"
            element={<Shop_Category_product />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
