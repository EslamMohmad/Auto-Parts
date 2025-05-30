import Process_Button from "./Process_Button";
import { filteredObject } from "../Utils/Function";
import { wishlistMessage } from "../Store/PortalSlice";
import { wishlist_addProductToUserWishlist } from "../Store/APIS";
import { useSelector } from "react-redux";

const AddToWishlist = (props) => {
  const { wishlistMessageState } = useSelector(
    ({ PortalSlice }) => PortalSlice
  );
  const filterdKeys = ["children", "afterloading", "product"];

  return (
    <Process_Button
      {...filteredObject(filterdKeys, props)}
      {...(!wishlistMessageState
        ? {
            afterloading: [
              wishlistMessage(true),
              wishlist_addProductToUserWishlist(props.product),
            ],
          }
        : "")}
    >
      {props.children}
    </Process_Button>
  );
};

export default AddToWishlist;
