import img_1 from "../Assets/HomeProducts/img (1).jpg";
import img_2 from "../Assets/HomeProducts/img (2).jpg";
import img_3 from "../Assets/HomeProducts/img (3).jpg";
import img_4 from "../Assets/HomeProducts/img (4).jpg";
import img_5 from "../Assets/HomeProducts/img (5).jpg";

export function setTrueTargetState(trueArray, object, payload) {
  for (let key in object) {
    if (trueArray.includes(key)) {
      object[key] = payload;
    } else object[key] = false;
  }
}

export function waiting(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const productDetails = {
  categorie: [
    "automotive rims",
    "car audio systems",
    "detailing ",
    "headlight",
  ],
  heading: "dorman steel wheel compatible with select honda models",
  text: "Full of flavour but with palate cleansing acidity, our kiwifruit are rich in fibre and packed with the enzyme actinidin which are brilliant for digestion.",
  SKU: "woo-belt",
  tags: ["ducati", "hyundai", "kia", "lamborghini", "toyota", "triumph"],
  rating: 3,
  price: { before: "$20.00", after: "$18.00" },
  sale: "-10%",
  imgs: [img_1, img_2, img_3, img_4, img_5],
};
