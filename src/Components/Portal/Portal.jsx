import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import MainMenu from "./MainMenu";
import { useEffect } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import CartMenu from "./CartMenu";
import SearchMenu from "./SearchMenu";
import Navbar_Mobile_Bottom from "./Navbar_Mobile_Bottom";
import NewsLetters_Popup from "./NewsLetters_Popup";
import {
  closeOverlay,
  toggleNewsLetterPopup,
  toggleSearchMenu,
} from "../../Store/PortalSlice.js";
import Fixed_Navbar from "./Fixed_Navbar.jsx";
import ProductQuickView from "./ProductQuickView.jsx";
import Scroll_Top from "./Scroll_Top.jsx";
import Auth from "./Auth.jsx";
import Right_Filter from "./Right_Filter.jsx";

const Portal = () => {
  const props = useSelector(({ PortalSlice }) => PortalSlice);

  const lessDesktop = useMediaQuery("(max-width : 1024px)");
  const isMobile = useMediaQuery("(max-width : 639px)");

  const action = useDispatch();

  useEffect(() => {
    const allFalseValue = Object.values(props).every((value) => !value);
    props?.overlayState &&
      !allFalseValue &&
      !lessDesktop &&
      action(closeOverlay());
    props?.searchMenuState && !isMobile && action(toggleSearchMenu(false));
  }, [lessDesktop, isMobile, props?.searchMenuState]);

  //newsletter popup
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (document.readyState === "complete") {
        action(toggleNewsLetterPopup(true));
      }
    }, 1500);

    return () => clearTimeout(debounce);
  }, []);

  return createPortal(
    <>
      <Fixed_Navbar />
      <Overlay>
        <Auth />
        <MainMenu />
        <CartMenu />
        <SearchMenu />
        <NewsLetters_Popup />
        <ProductQuickView />
        <Right_Filter />
      </Overlay>
      {isMobile && <Navbar_Mobile_Bottom />}
      {!isMobile && <Scroll_Top />}
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
