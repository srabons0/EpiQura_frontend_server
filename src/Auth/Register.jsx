import { useState } from "react";
import img from "/assets/food-banner/login-44.jpg";
import img1 from "/assets/food-banner/login-5.avif";
import { motion } from "framer-motion";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialUser from "./SocialUser";
import useDataLoader from "../hooks/useDataLoader";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [hidden, setHidden] = useState(true);
  const [err, setErr] = useState('');
  const { createUser, updatedUserProfile,resetPassword } = useAuth();
  const axiosInstance = useDataLoader();
  const location = useLocation();
  const navigate = useNavigate();
  // useScrollToTop();
  const { register, handleSubmit, formState } = useForm();

  const handleHidden = (e) => {
    e.preventDefault();
    return setHidden(!hidden);
  };

  const onSubmit = (data) => {
    // console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then(async (res) => {
        console.log(res.user);
setErr('');
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          status: "active",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/user", userInfo);
        console.log(userRes.data);

        updatedUserProfile(name)
          .then((data) => {
            // console.log("userprofile updated", data);
            navigate(location.state ? location?.state : "/");
          })
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((error) => {
        console.log( error.message.includes("email-already-in-use") && setErr("Email already in used try another email!"));
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

        <div className="flex relative rounded-2xl px-2 md:h-150 bg-black/40 flex-col-reverse lg:flex-row justify-center items-center md:gap-10 gap-5 lg:gap-14 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 2, scale: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-2/8 text-center lg:text-left"
          >
        <motion.div
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 2, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1, delay: 0.2 }}
            >   <h1 className="text-3xl  md:block hidden sm:text-4xl lg:text-4xl font-bold mb-8">
              Register here!
            </h1></motion.div> 
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
          <div>
            <motion.div
              initial={{ opacity: 0, y: -200, x: 200 }}
              animate={{ opacity: 2, scale: 1, y: 0,x: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-3xl text-center block md:hidden sm:text-4xl lg:text-4xl font-bold mb-8">
                Register here!
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 2, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full sm:max-w-md lg:w-[500px] border-4 px-6 sm:px-12 py-8 sm:py-10 bg-black/40 rounded-2xl"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 font-medium"
              >
                <div className="">
                  <p className="font-semibold text-xl">Your Name</p>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Your Name"
                    className="w-full border-2 
                                rounded-md mt-3 h-12 py-2 px-4 bg-[#49494939]  text-lg placeholder:text-white"
                  />
                </div>
                <div className="">
                  <p className="font-semibold text-xl">Email</p>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Your Email"
                    className="w-full border-2 
                                rounded-md mt-3 h-12 py-2 px-4 bg-[#49494939]  text-lg placeholder:text-white"
                  />
                </div>
                <div className="relative">
                  <p className="font-semibold  text-xl">Password</p>
                  <input
                    type={hidden ? "password" : "text"}
                    {...register("password", { required: true })}
                    placeholder="Your password"
                    className="w-full mt-3 border-2 h-12 py-2 px-4 bg-[#49494939] 
                                 text-lg placeholder:text-white rounded-md"
                  />
                  <button onClick={handleHidden}>
                    {hidden ? (
                      <FaRegEye className="absolute right-4 top-14 w-5 h-5" />
                    ) : (
                      <FaEyeSlash className="absolute right-4 top-14 w-5 h-5" />
                    )}
                  </button>
                  <Link to="/forgot-password" className="hover:link hover:text-black  font-semibold  my-1">
  Forgot password?
</Link>
                </div>
                <p className="text-red-500">{err}</p>
                <div className="">
                  <motion.input
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.89 }}
                    type="submit"
                    className="w-full border-2 bg-[#49494939] mx-auto py-3 font-bold  
                                    text-xl rounded-md text-center"
                    value="Register"
                  />
                </div>
              </form>
              <p className="font-bold text-base mt-2">
                Do have an Account?{" "}
                <Link
                  to="/login"
                  className="hover:link hover:text-black text-[17px]"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
