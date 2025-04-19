import { useState } from "react";
import { testimonials } from "../../Utils/Function";
import Rating from "../../ReuseableComponents/Rating";

const Description = () => {
  const aboutArray = [
    "8 Spoke Design w/ Milled Aluminum Accents.",
    "Single Piece Aluminum Construction.",
    "RC Carbon Fiber Center Cap.",
    "Matte Black Coat w/ Machined Accents.",
    "Backed by Rough Countrys Limited Lifetime Replacement Warranty.",
  ];

  return (
    <article className="py-10 text-black/60 text-[13px]">
      <p className="py-5 leading-7">
        Donec dapibus tellus sem, quis aliquam libero pharetra non. Nam vitae
        fermentum leo. Pellentesque bibendum dui eu mi tempor sodales. Integer
        gravida odio in sem laoreet tempus. Nunc vehicula nibh mauris, id
        bibendum metus facilisis iaculis. Phasellus suscipit dictum lacus eu
        auctor. Duis commodo faucibus lectus, et accumsan quam egestas at.
        Praesent eros mi, condimentum sit amet felis quis, hendrerit ullamcorper
        turpis. Etiam vel cursus elit, ut semper velit. Aenean sagittis leo
        massa, fermentum sollicitudin sem facilisis vel. Suspendisse potenti.
        Fusce porta tincidunt interdum. Praesent nec diam eleifend, vestibulum
        justo aliquet, aliquam ipsum. Curabitur egestas, augue a pellentesque
        ornare, tellus velit pulvinar nisl, sit amet placerat enim sem vel elit.
        Duis a mi metus. Suspendisse vulputate velit tempus efficitur lacus sit
        amet nunc ultricies ac gravida ante tempor
      </p>
      <div>
        <h1 className="text-xl font-bold capitalize text-black pb-4">
          about this item
        </h1>
        <ol className="list-disc flex flex-col gap-4 pl-4">
          {aboutArray.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ol>
      </div>
    </article>
  );
};

const AdditionalInformation = () => {
  const size = [16, 18, 20, 22];

  return (
    <article className="py-10">
      <div className="bg-black/10 py-3 px-2">
        <div className="flex">
          <h3 className="w-[150px] font-bold">size</h3>
          <div>
            {size.map((li) => (
              <span key={li} className="text-sm ml-3 text-black/50">
                {li} inch,
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const Reviews = () => {
  return (
    <article className="flex flex-col gap-5 py-10">
      {testimonials.map((li) => (
        <div key={li.id} className="flex gap-7 items-center py-5">
          <img src={li.img} className="w-[90px] h-[90px] rounded-full" />
          <div className="text-black/50">
            <Rating rating={li.rating} />
            <h5 className="my-4 text-sm">
              <span className="font-bold text-black">{li.info.name}</span>
              <span className="mx-2">-</span>
              <span>{li.info.contry}</span>
            </h5>
            <p className="text-[13px]">{li.text}</p>
          </div>
        </div>
      ))}
    </article>
  );
};

const MoreInformation = () => {
  const sectionsArray = [
    { name: "description", state: true, component: <Description /> },
    {
      name: "informations",
      state: false,
      component: <AdditionalInformation />,
    },
    { name: "reviews", state: false, component: <Reviews /> },
  ];

  const [sectionsState, setSectionsState] = useState(sectionsArray);

  const selectSectionHandler = (section) => {
    const result = sectionsState.map((object) =>
      section.name === object.name
        ? { ...object, state: true }
        : { ...object, state: false }
    );

    setSectionsState(result);
  };

  const targetComponent = sectionsState.filter((section) => section.state)[0]
    .component;

  return (
    <div className="py-5">
      <ul className="flex gap-2">
        {sectionsState.map((section) => (
          <li key={section.name}>
            <button
              className={`py-3 px-6 rounded-t-2xl text-[13px] shadow-[inset_0_-5px_10px_lightgray] border relative bg-black/10 border-black/15 cursor-pointer whitespace-normal overflow-hidden text-ellipsis ${
                section.state &&
                "bg-white border-b-0 shadow-none z-[1] top-[2px]"
              }`}
              onClick={() => selectSectionHandler(section)}
            >
              {section.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="border-t border-black/20 relative z-0">
        {targetComponent}
      </div>
    </div>
  );
};

export default MoreInformation;
