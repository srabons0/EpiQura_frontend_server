import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaChartBar,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaUserCog,
  FaHistory,
} from "react-icons/fa";
import { MdDashboard, MdNotificationsActive } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
const navItems = [
  { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard/user/home" },
  { name: "My Orders", icon: <FaBoxOpen />, path: "/dashboard/user/orders" },
  {
    name: "Payments",
    icon: <FaHistory />,
    path: "/dashboard/user/payments",
  },
  {
    name: "Notifications",
    icon: <MdNotificationsActive />,
    path: "/dashboard/user/notifications",
  },
  { name: "My Reviews", icon: <FaStar />, path: "/dashboard/user/reviews" },
  { name: "profile", icon: <FaUserCog />, path: "/dashboard/user/profile" },
  // { name: "home", icon: <FaHome />, path: "/" },
];

const UserDashboardNav = ({ handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed top-6 left-1 z-50 p-1 bg-orange-500 rounded-lg text-white cursor-pointer hover:bg-white hover:text-orange-500 transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <IoIosArrowForward
          className={`w-6 h-6 transition-transform duration-300 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 288 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`bg-linear-to-b from-yellow-400 to-orange-500 text-white flex flex-col h-screen px-4 py-6 md:py-10 border-r-4 border-orange-500 fixed md:relative z-40 ${
          isCollapsed ? "w-20 hidden md:block" : "w-72"
        }`}
      >
        <div>
          
          {!isCollapsed ? (
            <h1 className="text-3xl font-bold mb-10 text-center">
              
            Dashboard
            </h1>
          ) : (
            <motion.div
              whileHover={{ scale: 1.001 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="px-2.5 py-0.5 bg-orange-500 text-center mb-10 rounded-lg text-white hover:bg-white hover:text-orange-500 cursor-pointer"
            >
     
              <IoIosArrowForward
                className={`w-6 h-6 transition-transform duration-300 ${isCollapsed ? "rotate-0 " : "rotate-180"}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
              />
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              onClick={() => setIsCollapsed(true)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 mb-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-white hover:text-orange-500"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <motion.span
                  className="whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.name}
                </motion.span>
              )}
            </NavLink>
          ))}

          <div className="border w-11/12 mx-auto my-2"></div>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer ${
                isActive
                  ? "bg-white text-orange-500"
                  : "hover:bg-white hover:text-orange-500"
              }`
            }
          >
            <span><FaHome className="" /></span>
            {!isCollapsed && <span className="whitespace-nowrap">Home</span>}
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboardNav;
