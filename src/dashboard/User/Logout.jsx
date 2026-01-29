import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Logout = ({ clearAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    clearAuth();
    toast.success("You have successfully logged out!");
    navigate("/");
  };

  useEffect(() => {
  
    const timer = setTimeout(handleLogout, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-6 bg-white text-gray-800 p-10 rounded-3xl shadow-2xl"
      >
        <FaSignOutAlt className="text-6xl text-yellow-500" />
        <h2 className="text-3xl font-bold">Are you sure you want to logout?</h2>
        <p className="text-gray-600">You will be redirected to the homepage.</p>

        <div className="flex gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/user")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Cancel
          </motion.button>
        </div>

        <p className="mt-4 text-gray-400 text-sm">Auto logout in 5 seconds if no action is taken.</p>
      </motion.div>
    </div>
  );
};

export default Logout;
