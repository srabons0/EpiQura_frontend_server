import { motion } from "framer-motion";
import { FaSignOutAlt, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className=" flex  justify-center  px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
            <FaSignOutAlt />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 text-center">
          Sign Out
        </h1>
        <p className="text-sm text-slate-500 text-center mt-2">
          Are you sure you want to log out of your account?
        </p>

        <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600 flex  gap-3">
          <FaShieldAlt className="text-slate-400 w-8  mt-0.5" />
          <p>
            Logging out will end your current session. You’ll need to sign in
            again to access your dashboard. You will be redirected to the
            homepage.
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white py-2.5 text-sm font-semibold hover:bg-red-500 "
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          Auto logout in 5 seconds if no action is taken.
        </p>
      </motion.div>
    </div>
  );
};

export default Logout;
