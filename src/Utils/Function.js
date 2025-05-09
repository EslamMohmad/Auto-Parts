import testimonial_1 from "../Assets/Home/Testimonial/testimonial (1).jpg";
import testimonial_2 from "../Assets/Home/Testimonial/testimonial (2).jpg";
import testimonial_3 from "../Assets/Home/Testimonial/testimonial (3).jpg";

export function setTrueTargetState(trueArray, object, payload) {
  for (let key in object) {
    if (trueArray.includes(key)) {
      object[key] = payload;
    } else key !== "loadingState" && (object[key] = false);
  }
}

export function waiting(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const testimonials = [
  {
    id: 0,
    heading: "great price & services",
    img: testimonial_1,
    rating: 3,
    text: "automize rice crackers are a staple in my pantry. They are a healthier alternative to traditional crackers and chips, but still satisfy my craving for something spicy and crunchy. Chilli garlic flavor is my personal favorite - it's so delicious!",
    info: { name: "jennifer", contry: "california" },
  },
  {
    id: 1,
    heading: "great price & services",
    img: testimonial_2,
    rating: 5,
    text: "i have been using Automize's personal care products for a while now, and I must say, I am impressed. The quality is top-notch, and the natural ingredients make me feel good about what I'm putting on my skin. Highly recommend!",
    info: { name: "christopher", contry: "new orleans" },
  },
  {
    id: 2,
    heading: "great price & services",
    img: testimonial_3,
    rating: 4,
    text: "as a vegetarian, I always miss out on the classic breakfast staple of omelettes. But with Automize Store's Veg Omelette premix, I can finally enjoy a tasty and protein-packed breakfast option. The mix is easy to use and customize with my favorite veggies.",
    info: { name: "jessica", contry: "chicago" },
  },
];

export const totalPrice = (products) => {
  let count = 0;
  products.map(
    (product) =>
      (count += +product.amount * +product.size.price.replace(/\$/g, ""))
  );
  return count;
};
