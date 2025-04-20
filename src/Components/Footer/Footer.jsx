import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import app_store from "../../Assets/Home/Footer/store (1).png";
import google_play from "../../Assets/Home/Footer/store (2).png";

import List from "./List";
import { motion } from "framer-motion";
import Logo from "../../ReuseableComponents/Logo";
import Payment_Imgs from "../../ReuseableComponents/Payment_Imgs";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/Auto-Parts" ? true : false;

  const contacts = [
    {
      icon: "fa-solid fa-phone",
      text: (
        <a href="tel:+01002623871">
          we're available by phone{" "}
          <span
            className={`${isHome ? "text-black" : "text-red-500"} font-bold`}
          >
            +01002623871
          </span>
        </a>
      ),
    },
    {
      icon: "fa-regular fa-envelope",
      text: (
        <a href="mailto:eslammohmad998@gmail.com">eslammohmad998@gmail.com</a>
      ),
    },
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

  return (
    <footer
      className={`${isHome ? "bg-gray-200/70" : "bg-darkBlue text-red-600"}`}
    >
      <div className="pt-10 max-w-screen-2xl px-[25px] mx-auto">
        <div className="py-14 flex flex-wrap gap-10 lg:gap-0 justify-between">
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ".5" }}
            viewport={{ margin: "-100px", once: true }}
            className="flex flex-col gap-5 w-full sm:w-[43%] lg:w-1/4"
          >
            <Logo />
            <p
              className={`text-[12px] ${
                isHome ? "text-black/70" : "text-white"
              }`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate, assumenda? Voluptatum ducimus
            </p>
            <ul
              className={`flex flex-col gap-3 ${
                isHome ? "text-black/90" : "text-white"
              }`}
            >
              {contacts.map(({ icon, text }) => (
                <li key={icon} className="group whitespace-nowrap">
                  <FontAwesomeIcon
                    icon={icon}
                    size="xl"
                    className="group-hover:animate-vibration"
                  />
                  <span
                    className={`ml-5 text-[13px] ${
                      isHome ? "text-black/70 " : "text-white"
                    }`}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
          {Object.keys(lists).map((parent, index) => (
            <List
              lists={lists}
              parent={parent}
              key={parent}
              index={index}
              isHome={isHome}
            />
          ))}
        </div>
        <div className="bg-white p-6 rounded-xl flex flex-col sm:flex-row justify-between gap-5 text-black">
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
          <h1
            className={`text-[12px] ${
              isHome ? " text-black/60" : "text-white"
            }`}
          >
            Copyright © 2025 Eslam Mohmad. All Rights Reserved.
          </h1>
          <Payment_Imgs />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
