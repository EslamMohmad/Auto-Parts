import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Attributes = () => {
  const attributes = [
    {
      icon: "fa-solid fa-truck-fast",
      heading: "free us delivery",
      text: "For US customers (including Alaska and Hawaii) or orders over $200",
    },
    {
      icon: "fa-solid fa-credit-card",
      heading: "secure payment",
      text: "We accept Visa, American Express, Paypal, Payoneer Mastercard and Discover",
    },
    {
      icon: "fa-solid fa-umbrella",
      heading: "1 year warranty",
      text: "All of our products are made with care and covered for one year against manufacturing defects",
    },
    {
      icon: "fa-solid fa-headphones-simple",
      heading: "support 24/7",
      text: "Contact us 24 hours a day, 7 days a week Call Us: 0123-456-789",
    },
  ];

  return (
    <section>
      <div className="flex py-10 flex-wrap lg:flex-nowrap">
        {attributes.map(({ icon, heading, text }) => (
          <div
            key={heading}
            className="sm:w-1/2 lg:w-1/4 flex flex-col gap-5 group p-5"
          >
            <div className="w-[70px] h-[70px] leading-[70px] text-center bg-gray-200 rounded-full text-red-500 transition-colors">
              <FontAwesomeIcon
                icon={icon}
                size="xl"
                className="group-hover:animate-vibration"
              />
            </div>
            <h1 className="uppercase text-[sm]">{heading}</h1>
            <p className="text-black/45 text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Attributes;
