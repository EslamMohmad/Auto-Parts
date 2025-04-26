import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const Rating = ({ rating }) => {
  const ratingStarsHandler = () => {
    const emptyStars = Array.from(
      { length: 5 },
      (e) =>
        (e = (
          <FontAwesomeIcon
            key={e}
            icon="fa-solid fa-star"
            className="text-gray-300"
            size="sm"
          />
        ))
    );

    emptyStars.splice(
      0,
      +rating,
      ...Array.from(
        { length: +rating },
        (e) =>
          (e = (
            <FontAwesomeIcon
              key={e}
              icon="fa-solid fa-star"
              className="text-amber-500"
              size="sm"
            />
          ))
      )
    );

    return emptyStars;
  };

  return (
    <div className="inline-flex gap-0.5 w-fit">
      {ratingStarsHandler().map((star, idx) => (
        <span key={`${star} ${idx}`}>{star}</span>
      ))}
    </div>
  );
};

export default memo(Rating);
