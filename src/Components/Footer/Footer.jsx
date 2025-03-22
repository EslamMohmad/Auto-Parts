import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../Assets/Home/Navbar/logo.png";

import app_store from "../../Assets/Home/Footer/store (1).png";
import google_play from "../../Assets/Home/Footer/store (2).png";

import payment_1 from "../../Assets/Footer/payment (1).jpg";
import payment_2 from "../../Assets/Footer/payment (2).jpg";
import payment_3 from "../../Assets/Footer/payment (3).jpg";
import payment_4 from "../../Assets/Footer/payment (4).jpg";
import payment_5 from "../../Assets/Footer/payment (5).jpg";
import List from "./List";
import { motion } from "framer-motion";

const Footer = () => {
  const contacts = [
    {
      icon: "fa-solid fa-phone",
      text: "we're available by phone +01002623871",
    },
    { icon: "fa-regular fa-envelope", text: "eslammohmad998@gmail.com" },
    { icon: "fa-regular fa-clock", text: "Monday till friday 10 to 6 EST" },
  ];

  const lists = {
    "help & support": [
      "shipping info",
      "returns",
      "how to order",
      "how to track",
      "size guide",
    ],
    "company info": [
      "about us",
      "our blog",
      "careers",
      "store locations",
      "testimonial",
    ],
    "customer care": [
      "FAQs",
      "terms of service",
      "privacy policy",
      "contact us",
      "gift card",
    ],
  };

  const platforms = [
    "fa-brands fa-facebook-f",
    "fa-brands fa-pinterest",
    "fa-brands fa-x-twitter",
    "fa-brands fa-tiktok",
    "fa-brands fa-vimeo",
  ];

  const payment = [payment_1, payment_2, payment_3, payment_4, payment_5];

  return (
    <footer className="bg-gray-200/70">
      <div className="pt-10 max-w-screen-2xl px-[25px] mx-auto">
        <div className="py-14 flex flex-wrap gap-10 lg:gap-0 justify-between">
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ".5" }}
            viewport={{ margin: "-100px", once: true }}
            className="flex flex-col gap-5 w-full sm:w-[43%] lg:w-1/4"
          >
            <img src={logo} className="w-[200px]" />
            <p className="text-[12px] text-black/70">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, assumenda? Voluptatum ducimus
            </p>
            <ul className="flex flex-col gap-3 text-black/90">
              {contacts.map(({ icon, text }) => (
                <li key={icon} className="group whitespace-nowrap">
                  <FontAwesomeIcon
                    icon={icon}
                    size="xl"
                    className="group-hover:animate-vibration"
                  />
                  <span className="ml-5 text-[13px] text-black/70 ">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
          {Object.keys(lists).map((parent, index) => (
            <List lists={lists} parent={parent} key={parent} index={index} />
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl flex flex-col sm:flex-row justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ".5" }}
            viewport={{ margin: "0px", once: true }}
            className="flex gap-4 lg:gap-8 items-center flex-wrap"
          >
            <h1 className="uppercase">follow us : </h1>
            <ul className="flex gap-1">
              {platforms.map((platform) => (
                <li key={platform}>
                  <button className="hover:text-white active:text-white transition-colors cursor-pointer hover:bg-red-500 active:bg-red-500 w-[40px] h-[40px] rounded-full">
                    <FontAwesomeIcon icon={platform} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center sm:ml-auto">
            <h1 className="uppercase">download app on mobile : </h1>
            <div className="flex gap-4">
              <a href="https://www.apple.com/app-store/" target="_blank">
                <img src={app_store} className="w-[90px] md:w-[150px]" />
              </a>
              <a href="https://play.google.com/" target="_blank">
                <img src={google_play} className="w-[90px] md:w-[150px]" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center py-8">
          <h1 className="text-[12px] text-black/60">
            Copyright © 2025 Eslam Mohmad. All Rights Reserved.
          </h1>
          <ul className="flex gap-2 items-center">
            {payment.map((li) => (
              <li key={li}>
                <img
                  src={li}
                  className="w-[45px] hover:scale-110 transition-transform"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
