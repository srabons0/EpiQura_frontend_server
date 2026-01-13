import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import useDataLoader from "../hooks/useDataLoader";
import { FaGithub } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
// import { AuthContext } from "../../Auth/AuthProvider";


const SocialUser = () => {

  const { signWithGoogle } = useAuth();
  const axiosInstance = useDataLoader();
  const location = useLocation();
  const navigate = useNavigate();
      const handleSignWithGoogle = () => {
    signWithGoogle()
      .then(async(res) => {
        // console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
          photo: res.user?.photoURL,
          status: "active",
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/user", userInfo);
        // console.log(userRes.data);
        navigate(location.state ? location?.state : "/");
      })
      .catch((error) =>{ 
        // console.log(error)
      });
  };

    return (
        <div className="flex gap-10 flex-col">
              <motion.button
                onClick={handleSignWithGoogle}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.89 }}
                className="w-full border-2 bg-[#0000007f] mx-auto py-3 font-bold  text-xl rounded-md flex items-center justify-center gap-2"
              >
                <FcGoogle /> Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.89 }}
                className="w-full border-2 bg-[#0000007f] mx-auto py-3 font-bold  text-xl rounded-md flex items-center justify-center gap-2"
              >
                <FaGithub />
                github
              </motion.button>
            </div>
    );
};

export default SocialUser;