import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, use, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import useEmptyInput from "../../Hooks/useEmptyInput";
import { getUserdata } from "../../Store/AuthSlice";
import { toggleAuthState } from "../../Store/PortalSlice";

const Login = forwardRef(({ state }, ref) => {
  const email = useRef();
  const password = useRef();

  const action = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    const { login_password, login_email } = e.target;
    const details = [login_email.value, login_password.value];
    signInWithEmailAndPassword(auth, ...details)
      .then((userCredential) => {
        const user = userCredential.user;
        action(getUserdata({ email: user.email }));
        action(toggleAuthState(false));
      })
      .catch((error) => {
        alert(error.message);
      });

    [email, password].forEach((element) => {
      element.current.value = "";
    });
  };

  useEmptyInput(state, [email, password]);

  return (
    <div ref={ref}>
      <form className="flex flex-col gap-2" onSubmit={loginHandler}>
        <p className="text-sm font-bold my-7 mb-3 text-black/70">
          insert your account information
        </p>
        <div>
          <label htmlFor="login_email" className="text-[11px] text-black/60">
            email address
            <span className="text-red-400"> *</span>
          </label>
          <input
            ref={email}
            required
            id="login_email"
            type="email"
            placeholder="enter your email"
            className="py-4 px-5 w-full mt-2 outline-none border border-black/15 rounded-sm placeholder:uppercase placeholder:text-[10px] text-[12px] focus:border-black hover:border-black transition-all"
          />
        </div>
        <div>
          <label htmlFor="login_password" className="text-[11px] text-black/60">
            password
            <span className="text-red-400"> *</span>
          </label>
          <input
            ref={password}
            required
            id="login_password"
            type="password"
            placeholder="password"
            className="py-4 px-5 w-full mt-2 outline-none border border-black/15 rounded-sm placeholder:uppercase placeholder:text-[10px] text-[12px] focus:border-black hover:border-black transition-all"
          />
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember me"
              className="accent-black w-[18px] h-[18px] transition-all"
            />
            <label
              htmlFor="remember me"
              className="text-[11px] text-black/60 ml-3"
            >
              remember me
            </label>
          </div>
          <a className="text-black/70 hover:text-red-500 active:text-red-500 text-[11px] cursor-pointer transition-colors">
            lost your password ?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3.5 text-[12px] font-bolder uppercase bg-black text-white rounded-md cursor-pointer mt-2 transition-colors hover:bg-red-600 active:bg-red-500"
        >
          login
        </button>
        <samp></samp>
      </form>
    </div>
  );
});

const Register = forwardRef(({ state }, ref) => {
  const email = useRef();
  const password = useRef();

  const action = useDispatch();

  const createNewUser = (e) => {
    e.preventDefault();
    const { register_password, register_email } = e.target;

    const details = [register_email.value, register_password.value];

    createUserWithEmailAndPassword(auth, ...details)
      .then((userCredential) => {
        const user = userCredential.user;

        action(getUserdata({ email: user.email }));
        action(toggleAuthState(false));
      })
      .catch((error) => {
        alert("email already in use");
      });

    [email, password].forEach((element) => {
      element.current.value = "";
    });
  };

  useEmptyInput(state, [email, password]);

  return (
    <div
      className={`absolute ${
        state ? "top-[100px]" : "top-full"
      } transition-all bg-white w-full left-0 p-6 pt-0 duration-500`}
      ref={ref}
    >
      <form className="flex flex-col gap-2" onSubmit={createNewUser}>
        <p className="text-sm font-bold my-7 mb-3 text-black/70">
          create your account
        </p>
        {/* <div>
          <label
            htmlFor="register_username"
            className="text-[11px] text-black/60"
          >
            username
            <span className="text-red-400"> *</span>
          </label>
          <input
            id="register_username"
            type="username"
            placeholder="username"
            className="py-4 px-5 w-full mt-2 outline-none border border-black/15 rounded-sm placeholder:uppercase placeholder:text-[10px] text-[12px] focus:border-black hover:border-black transition-all"
          />
        </div> */}
        <div>
          <label htmlFor="register_email" className="text-[11px] text-black/60">
            email
            <span className="text-red-400"> *</span>
          </label>
          <input
            ref={email}
            required
            id="register_email"
            type="email"
            placeholder="email"
            className="py-4 px-5 w-full mt-2 outline-none border border-black/15 rounded-sm placeholder:uppercase placeholder:text-[10px] text-[12px] focus:border-black hover:border-black transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="register_password"
            className="text-[11px] text-black/60"
          >
            password
            <span className="text-red-400"> *</span>
          </label>
          <input
            ref={password}
            required
            id="register_password"
            type="password"
            placeholder="password"
            className="py-4 px-5 w-full mt-2 outline-none border border-black/15 rounded-sm placeholder:uppercase placeholder:text-[10px] text-[12px] focus:border-black hover:border-black transition-all"
          />
        </div>

        <p className="text-[11px] text-black/50">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>
        <button
          type="submit"
          className="w-full py-3.5 text-[12px] font-bolder uppercase bg-black text-white rounded-md cursor-pointer mt-2 transition-colors hover:bg-red-600 active:bg-red-500"
        >
          register
        </button>
        <samp></samp>
      </form>
    </div>
  );
});

const Auth = () => {
  const { authState } = useSelector(({ PortalSlice }) => PortalSlice);

  const [currentForm, setCurrentForm] = useState("login");

  const registerForm = useRef();
  const loginForm = useRef();

  const forms = {
    login: { position: "0" },
    register: { position: "105px" },
  };

  return (
    <AnimatePresence>
      {authState && (
        <motion.div
          initial={{ opacity: 0, top: "-50%" }}
          animate={{
            opacity: 1,
            top: "50%",
          }}
          exit={{ opacity: 0, top: "-50%" }}
          className="bg-white absolute rounded-2xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:shadow-2xl w-[400px] shadow-box overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`flex flex-col p-6`}>
            <div className="bg-gray-200 p-3 rounded-full relative w-fit mx-auto">
              <div
                style={{ left: forms[currentForm].position + "" }}
                className={`absolute w-[105px] h-[45px] mx-3 top-1/2 -translate-y-1/2 transition-all duration-500 bg-white rounded-full z-[1] shadow-2xl`}
              ></div>
              {Object.keys(forms).map((form) => (
                <button
                  onClick={() => setCurrentForm(form)}
                  key={form}
                  className="w-[105px] h-[45px] text-sm relative z-[2] cursor-pointer font-bold"
                >
                  {form}
                </button>
              ))}
            </div>
            <Login ref={loginForm} state={currentForm === "login"} />
            <Register state={currentForm !== "login"} ref={registerForm} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Auth;
