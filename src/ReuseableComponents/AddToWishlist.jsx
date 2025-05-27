import Process_Button from "./Process_Button";
import { filteredObject } from "../Utils/Function";
import { loginMessage } from "../Store/PortalSlice";
import { wishlist_addProductToUserWishlist } from "../Store/APIS";

const AddToWishlist = (props) => {
  const filterdKeys = ["children", "afterloading", "product"];

  return (
    <Process_Button
      {...filteredObject(filterdKeys, props)}
      afterloading={[
        loginMessage(true),
        wishlist_addProductToUserWishlist(props.product),
      ]}
    >
      {props.children}
    </Process_Button>
  );
};

export default AddToWishlist;
