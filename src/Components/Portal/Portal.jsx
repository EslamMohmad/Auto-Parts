import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import MainMenu from "./MainMenu";
import { useEffect } from "react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { closeOverlay, toggleSearchMenu } from "../../Store/PortalSlice";
import CartMenu from "./CartMenu";
import SearchMenu from "./SearchMenu";
import Navbar_Mobile_Bottom from "./Navbar_Mobile_Bottom";

const Portal = () => {
  const props = useSelector(({ PortalSlice }) => PortalSlice);

  const lessDesktop = useMediaQuery("(max-width : 1024px)");
  const isMobile = useMediaQuery("(max-width : 639px)");

  const action = useDispatch();

  useEffect(() => {
    const allFalseValue = Object.values(props).every((value) => !value);
    !allFalseValue && !lessDesktop && action(closeOverlay());
    props?.searchMenuState && !isMobile && action(toggleSearchMenu(false));
  }, [lessDesktop, isMobile, props?.searchMenuState]);

  return createPortal(
    <>
      <Overlay>
        <MainMenu />
        <CartMenu />
        <SearchMenu />
      </Overlay>
      {isMobile && <Navbar_Mobile_Bottom />}
    </>,
    document.getElementById("portal")
  );
};

export default Portal;
