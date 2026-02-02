import { useContext, useState } from "react";
import img from "/assets/food-banner/login-44.jpg";
import img1 from "/assets/food-banner/login-5.avif";
import { motion } from "framer-motion";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDataLoader from "../hooks/useDataLoader";
import SocialUser from "./SocialUser";
import useAuth from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";


const Login = () => {
  const [hidden, setHidden] = useState(true);
  const { loginUser } = useAuth();

  const dataloader = useDataLoader();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.state)

  const handleHidden = (e) => {
    e.preventDefault();
    return setHidden(!hidden);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    loginUser(email, password)
      .then((res) => {
        //  console.log(res.user);
              toast.success("Your account has been successfully login!");
        navigate(location.state ? location?.state : "/");
      })
      .catch((error) =>{ 
        // console.log(error)
        toast.error("Failed to login. Try again.");

    });
  };

  return (
   <div className="relative text-white mx-auto pb-30">
  <div className="pt-20 sm:pt-32 md:pt-40 relative md:h-150  max-w-[1100px] mx-auto">
    <img
      className="absolute rounded-2xl w-full h-full object-cover hidden md:block"
      src={img}
      alt=""
    />
    <img
      className="absolute rounded-2xl w-full h-full object-cover md:hidden block"
      src={img1}
      alt=""
    />
    <div className="flex relative rounded-2xl px-2 md:h-150 bg-black/40 flex-col lg:flex-row-reverse justify-center items-center md:gap-10 gap-5 lg:gap-14 py-20 lg:py-32">

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full lg:w-2/8 text-center lg:text-left"
      >
        <motion.div
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 2, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1, delay: 0.2 }}
            > <h1 className="text-3xl md:text-right sm:text-4xl lg:text-4xl font-bold mb-8">
          Login here!
        </h1></motion.div>
        <SocialUser />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold  lg:my-0 text-center"
      >
        or
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full sm:max-w-md lg:w-[500px] border-4 px-6 sm:px-12 py-8 sm:py-10 bg-black/40 rounded-2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-medium">
          <div>
            <p className="font-semibold md:text-xl">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border-2 rounded-md mt-3 h-12 py-2 px-4 bg-[#49494939] md:text-lg placeholder:text-white"
              required
            />
          </div>

          <div className="relative">
            <p className="font-semibold md:text-xl">Password</p>
            <input
              type={hidden ? "password" : "text"}
              name="password"
              placeholder="Your password"
              className="w-full mt-3 border-2 h-12 py-2 px-4 bg-[#49494939] md:text-lg placeholder:text-white rounded-md"
              required
            />
            <button
              type="button"
              onClick={handleHidden}
              className="absolute right-4 top-13 md:top-14"
            >
              {hidden ? (
                <FaRegEye className="w-5 h-5" />
              ) : (
                <FaEyeSlash className="w-5 h-5" />
              )}
            </button>
            <Link to="/forgot-password" className="hover:link hover:text-black  font-semibold  my-1">
  Forgot password?
</Link>
          </div>

          <motion.input
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.89 }}
            type="submit"
            value="Login"
            className="w-full border-2 bg-[#49494939] py-3 font-bold md:text-xl rounded-md text-center mt-2"
          />
        </form>

        <p className="font-bold text-base mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="hover:link hover:text-black text-[17px]">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
      <Toaster position="top-right" reverseOrder={false} />

</div>

  );
};

export default Login;
