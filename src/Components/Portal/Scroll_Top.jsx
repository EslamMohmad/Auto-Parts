import useMediaQuery from "../../Hooks/useMediaQuery";

const Scroll_Top = () => {
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1024px)");

  return <div className="fixed bottom-10 right-5"></div>;
};

export default Scroll_Top;
