const ProductMap = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <h1 className="text-black/50">
        <span className="font-bold text-black">SKU : </span>
        {product?.SKU}
      </h1>
      <h1 className="text-black/50">
        <span className="font-bold text-black">categories : </span>
        {product?.categorie?.map((item, idx) => (
          <span
            key={item}
            className="capitalize hover:text-black active:text-black cursor-pointer"
          >
            {item} {product?.categorie?.length - 1 !== idx && " , "}
          </span>
        ))}
      </h1>
      <h1 className="text-black/50">
        <span className="font-bold text-black">tags : </span>
        {product?.tags?.map((tag, idx) => (
          <span
            key={tag}
            className="capitalize hover:text-black active:text-black cursor-pointer"
          >
            {tag} {tag.length - 1 !== idx && " , "}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default ProductMap;
