const Button_Title = ({ title }) => {
  return (
    <div className="absolute z-50 -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-2 rounded-md opacity-0 group-active:opacity-100 group-hover:opacity-100 scale-50 group-hover:scale-100 group-active:scale-100 text-[10px] transition-all font-bold tracking-wider w-[max-content] leading-5">
      {title}
      <div className="absolute rotate-45 -z-10 -bottom-1 left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-red-500"></div>
    </div>
  );
};

export default Button_Title;
