import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WrapperComponent from "./Components/WrapperComponent";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Shop_Category_product from "./Pages/Shop_Category_product";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ParentComponent from "./Components/ParentComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Auto-Parts" element={<WrapperComponent />}>
          <Route path="" element={<Home />} />
          <Route path="*" element={<ParentComponent />}>
            <Route path="shop/:category?" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route
            path="shop/:category/:product"
            element={<Shop_Category_product />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
