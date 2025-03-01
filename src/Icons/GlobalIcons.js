import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCartShopping,
  faBars,
  faArrowRightLong,
  faChevronRight,
  faHouse,
  faShop,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faPinterest,
  faXTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
export const globalIcons = () => {
  return library.add([
    faMagnifyingGlass,
    faUser,
    faHeart,
    faCartShopping,
    faBars,
    faArrowRightLong,
    faChevronRight,
    faFacebookF,
    faPinterest,
    faXTwitter,
    faTiktok,
    faHouse,
    faShop,
    faXmark,
  ]);
};
