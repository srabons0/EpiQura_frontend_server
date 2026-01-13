import { useContext, useState } from "react";
import img from "/assets/food/img.jpg";
import { motion } from "framer-motion";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDataLoader from "../hooks/useDataLoader";
import SocialUser from "./SocialUser";
import useAuth from "../hooks/useAuth";
// import { AuthContext } from "../../Auth/AuthProvider";

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
        navigate(location.state ? location?.state : "/");
      })
      .catch((error) =>{ 
        // console.log(error)
    });
  };

  return (
    <div>
      <div className="pt-40  relative text-[#ffffff] mx-auto w-[1100px]">
        <img className="absolute  rounded-2xl " src={img} alt="" />
        <div className="lg:flex relative flex-row-reverse mt-52 justify-center items-center gap-14">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 2, scale: 1, x: 0 }}
            exit={{opacity: 0, x: 200 }}
            transition={{ duration: 1, delay: 0.2 }}
            className=""
          >
            <h1 className="text-5xl font-bold text-white relative -top-24">
              Login here!
            </h1>
            <SocialUser></SocialUser>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 2, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl font-bold text-white"
          >
            or
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 2, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-[500px] border-4 px-16 py-10  bg-[#ffffff50]"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 font-medium"
            >
              <div className="">
                <p className="font-semibold text-xl">Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border-2 rounded-md mt-3 h-12 py-2 px-4 bg-[#49494939]  text-lg placeholder:text-white"
                  required
                />
              </div>
              <div className="relative">
                <p className="font-semibold  text-xl">Password</p>
                <input
                  type={hidden ? "password" : "text"}
                  name="password"
                  placeholder="Your password"
                  className="w-full mt-3 border-2 h-12 py-2 px-4 bg-[#49494939]  text-lg placeholder:text-white rounded-md"
                  required
                />
                <button onClick={handleHidden}>
                  {hidden ? (
                    <FaRegEye className="absolute right-4 top-14 w-5 h-5" />
                  ) : (
                    <FaEyeSlash className="absolute right-4 top-14 w-5 h-5" />
                  )}
                </button>
                <label className="label">
                  <a
                    href=""
                    className=" hover:link hover:text-black  font-semibold  my-1"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="">
                <motion.input
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.89 }}
                  type="submit"
                  className="w-full border-2 bg-[#49494939] mx-auto py-3 font-bold  text-xl rounded-md text-center"
                  value="Login"
                />
              </div>
            </form>
            <p className="font-bold text-base mt-2">
              Don`t have an Account?{" "}
              <Link
                to="/register"
                className="hover:link hover:text-black text-[17px]"
              >
                Register
              </Link>{" "}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
