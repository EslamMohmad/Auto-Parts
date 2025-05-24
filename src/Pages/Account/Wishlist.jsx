import { child, get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../../Firebase/Firebase";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({});

  console.log(wishlist);

  useEffect(() => {
    if (!Object.keys(wishlist).length) {
      const myRef = child(
        ref(database),
        `Auto-Parts-Users/${auth?.currentUser?.uid}/whishlist`
      );
      get(myRef).then((response) => setWishlist(response.val() || {}));
    }
  }, [Object.keys(wishlist).length]);

  return <div>Wishlist</div>;
};

export default Wishlist;
