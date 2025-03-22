import { useState } from "react";
import email from "../../Assets/Home/Newsletter/email.svg";
import { motion } from "framer-motion";

const SubscripeFrom = () => {
  const [valid, setValid] = useState(false);
  const [focus, setFocus] = useState(false);

  const emailValidation = (email) => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValid(!emailRegex.test(email));
    } else setValid(false);
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`border ${
          focus ? "border-red-600" : "border-black/30"
        } p-1.5 rounded-md h-[65px] flex gap-4 justify-between transition-colors`}
      >
        <input
          type="email"
          placeholder="enter your email"
          className="h-full pl-4 outline-none placeholder:uppercase text-[12px] text-black/50 w-[80%]"
          onBlur={({ target }) => (
            emailValidation(target.value), setFocus(false)
          )}
          onFocus={() => setFocus(true)}
        />
        <button className="px-6 py-3 uppercase rounded-sm transition-colors duration-300 bg-red-600 text-white active:bg-black hover:bg-black cursor-pointer text-[12px] h-full w-[max-content]">
          subscripe
        </button>
      </form>
      {valid && (
        <h6 className="text-red-500 text-[10px]">
          please enter an email address
        </h6>
      )}
    </>
  );
};

const NewsLetter = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: "100px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ".5" }}
      viewport={{ margin: "-100px", once: true }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-10">
        <div className="flex flex-col sm:flex-row text-center sm:text-left gap-8 w-full md:w-[53%] lg:w-[40%]">
          <img src={email} className="h-24" />
          <div className="font-bold">
            <h6 className="text-xl uppercase">newsletter</h6>
            <h1 className="text-xl lg:text-2xl uppercase mt-2 mb-5">
              subscripe & <span className="text-red-600">get 15% discount</span>
            </h1>
            <p className="text-sm text-black/50 font-light">
              get 15% off your first purchaxse! Plus, be the first to know about
              sales new product launches and exclusive offers!
            </p>
          </div>
        </div>
        <div className="w-full md:w-[45%]">
          <SubscripeFrom />
          <h6 className="text-[13px] mt-2 text-black/60">
            by subscribing you agree to our{" "}
            <a className="capitalize text-red-500 cursor-pointer">
              terms & conditions and privacy & cookies policy.
            </a>
          </h6>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsLetter;
