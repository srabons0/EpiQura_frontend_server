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
import { MdDashboard } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
const navItems = [
  { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard/admin/home" },
  { name: "Users", icon: <FaUsers />, path: "/dashboard/admin/users" },
  { name: "Orders", icon: <FaBoxOpen />, path: "/dashboard/admin/orders" },
  {
    name: "Payments",
    icon: <FaMoneyCheckAlt />,
    path: "/dashboard/admin/payments",
  },
  {
    name: "Payments History",
    icon: <FaHistory />,
    path: "/dashboard/admin/paymentsHistory",
  },
  {
    name: "Products",
    icon: <FaBoxOpen />,
    path: "/dashboard/admin/product/products",
  },
  {
    name: "Manage Products",
    icon: <IoIosCreate />,
    path: "/dashboard/admin/manageProducts",
  },
  { name: "Reviews", icon: <FaStar />, path: "/dashboard/admin/reviews" },
  { name: "profile", icon: <FaUserCog />, path: "/dashboard/admin/profile" },
  // { name: "home", icon: <FaHome />, path: "/" },
];

const AdminSidebar = ({ handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 288 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
        mass: 1,
        duration: 1.5,
        // delay: 0.5,
      }}
      className={` bg-gradient-to-b from-yellow-400 to-orange-500 text-white flex flex-col h-screen px-4 py-6 md:py-10 border-r-4 border-orange-500  ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      <div>
        {!isCollapsed ? (
          <h1 className="text-3xl font-bold mb-10 text-center">Admin Panel</h1>
        ) : (
          <motion.div
            whileHover={{ scale: 1.001 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="px-2.5 py-0.5 bg-orange-500 text-center mb-10 rounded-lg text-white hover:bg-white hover:text-orange-500  cursor-pointer"
          >
            <IoIosArrowForward
              className={` w-6 h-6 transition-transform duration-300 ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </motion.div>
        )}
      </div>
      <div className="flex flex-col gap-1 ">
        {navItems.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            onClick={() => setIsCollapsed(true)}
            className=" cursor-pointer"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 mb-2 rounded-lg font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-white text-orange-500"
                    : "hover:bg-white hover:text-orange-500"
                }`
              }
            >
              <span>{item.icon}</span>
              <motion.span
                variants={{
                  open: {
                    opacity: 1,
                    transition: { delay: 0.2, duration: 0.5 },
                  },
                  closed: {
                    opacity: 0,
                    transition: { duration: 0 },
                  },
                }}
                animate={isCollapsed ? "closed" : "open"}
                className="whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            </NavLink>
          </motion.div>
        ))}
        <div className="border w-11/12 mx-auto mb-1"></div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                isActive
                  ? "bg-white text-orange-500"
                  : "hover:bg-white hover:text-orange-500"
              }`
            }
          >
            <span>
              <FaHome />
            </span>
            {!isCollapsed && "Home"}
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
