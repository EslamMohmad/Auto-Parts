import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import MainMenu from "./MainMenu";

const Portal = () => {
  return createPortal(
    <Overlay>
      <MainMenu />
    </Overlay>,
    document.getElementById("portal")
  );
};

export default Portal;
