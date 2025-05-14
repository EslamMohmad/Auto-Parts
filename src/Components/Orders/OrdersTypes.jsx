const OrdersTypes = ({ details }) => {
  return (
    <div className="py-5 gap-4 flex flex-wrap w-full">
      {Object.keys(details).map((key) => (
        <div
          key={key}
          className="text-sm w-full md:w-[calc(50%_-_0.75rem)] xl:w-[calc(25%_-_0.75rem)] bg-black/10 p-4 text-center rounded-md xl:whitespace-nowrap"
        >
          <span className="text-black/50">{key.replace("_", " ")} : </span>
          <span className="font-bold text-[13px] capitalize">
            {details[key]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrdersTypes;
