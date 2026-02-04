import { useState } from "react";
import { motion } from "framer-motion";
import {
  BsFillPeopleFill,
  BsMenuButtonWide,
  BsPersonCircle,
} from "react-icons/bs";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import img1 from "/assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoHome,  IoLocationSharp } from "react-icons/io5";
import { MdOutlineRestaurantMenu, MdSpaceDashboard } from "react-icons/md";
import {  FaSignInAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../ui/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delay: 0.2,
    },
  },
};

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user, loading } = useAuth();
  const [isAdmin] = useAdmin();
// console.log(isAdmin)

  const menuItems = [
    { to: "/", label: "Home", icon: IoHome },
    { to: "/recipes/beef", label: "Recipes", icon: MdOutlineRestaurantMenu },
    {
      to:  isAdmin ? "/dashboard/admin/home" : "/dashboard/user/home",
      label: "Dashboard",
      icon: MdSpaceDashboard,
    },
    { to: "/about", label: "About us", icon: BsFillPeopleFill },
    { to: "/contact", label: "Contact us", icon: IoIosCall },
    { to: user ? `/dashboard/${isAdmin?"admin":"user"}/profile`:"/login" , label: user ? "Profile" : "Login", icon: user ? BsPersonCircle : FaSignInAlt },
  ];

  return (
    <div className="">
      <div className="navbar  z-100 absolute top-0 ">
        <div className="navbar-start">
          <div
            onClick={() => {
              setIsActive(!isActive);
            }}
            className="dropdown"
          >
            <motion.div
              initial={{ opacity: 0, scale: -0.5, x: -100 }}
              animate={{ opacity: 2, scale: 1.1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              tabIndex={0}
              role="button"
              className={` text-white bg-black p-1.5 md:p-2.5 z-50 relative cursor-pointer btn-circle`}
            >
              {!isActive ? (
                <motion.div
                  initial={{ scale: 0.1 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    duration: 2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <BsMenuButtonWide className="w-3 h-3 md:w-6 md:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 180, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <AiOutlineClose className="w-3 h-3  md:w-6 md:h-6" />
                </motion.div>
              )}
            </motion.div>
            <motion.ul
              animate={isActive ? "open" : "closed"}
              variants={variants}
              tabIndex={0}
              className={`${
                isActive ? "absolute" : "hidden"
              } lg:pt-32 pt-20 pb-10 w-40 md:w-64 md:ps-14 ps-5 text-[12px]  -top-7 rounded-b-lg h-screen lg:h-[770px] -left-5 z-40
               text-white bg-[#00000099] flex flex-col gap-5 lg:gap-10 text-center`}
            >
              {menuItems.map(({ to, label, icon: Icon }) => (
                <motion.li
                  key={label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setIsActive(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 w-11/12 bg-[#000000d5]
                 px-4 py-1 lg:py-2 rounded-md
           ${
             isActive
               ? "bg-white/40 border-l-4 border-orange-500 text-white"
               : "border-l-4 border-transparent hover:bg-white/20"
           }`
                    }
                  >
                    <Icon className="lg:w-5 lg:h-5" />
                    <span className="text-xs lg:text-sm font-medium">{label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: -0.5, y: -100 }}
          animate={{ opacity: 2, scale: 1.1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className=" z-20 navbar-center cursor-pointer"
        >
          <NavLink to="/" className="flex items-center">
            <motion.img
              whileTap={{ scale: 0.8 }}
              whileHover={{
                scale: 1.1,
                rotate: 360,
              }}
              className="w-12 md:w-20"
              src={img1}
              alt=""
            />
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="  font-semibold  text-[#FFA823] text-xl md:text-3xl"
            >
              EpiQura
            </motion.div>
          </NavLink>
        </motion.div>

        <div className="navbar-end gap-1 ">
<motion.div
            whileHover={{ scale: 1.102 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <Link to="/coverage">
              <motion.button
                initial={{ opacity: 0, scale: -0.5, y: -100 }}
                animate={{ opacity: 2, scale: 1.1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="md:p-3 p-1.5 bg-[#00000033] relative hover:bg-[#00000075] text-white border-none btn-circle mr-1 md:mr-5  z-30"
              >
                <IoLocationSharp className="w-3.5 h-3.5 md:w-6 md:h-6 text-white" />
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.102 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <Link to="/addToCart">
              <motion.button
                initial={{ opacity: 0, scale: -0.5, y: 100 }}
                animate={{ opacity: 2, scale: 1.1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="md:p-3 p-1.5 bg-[#00000033] relative hover:bg-[#00000075] text-white border-none btn-circle md:mr-5  z-30"
              >
                <AiOutlineShoppingCart className="w-3.5 h-3.5 md:w-6 md:h-6 text-white" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <motion.button
              initial={{ opacity: 0, scale: -0.5, x: 50 }}
              animate={{ opacity: 2, scale: 1.1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="btn hidden md:block  btn-ghost btn-circle mr-10 border-none w-12 h-12 z-30 hover:bg-[#00000050]"
            >
              {user ? (
                user.photoURL ? (
                  <Link
                    to={
                      isAdmin
                        ? "/dashboard/admin/profile"
                        : "/dashboard/user/profile"
                    }
                  >
                    <img
                      onClick={() => setIsOpen((prev) => !prev)}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
                      src={user.photoURL}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link
                    to={
                      isAdmin
                        ? "/dashboard/admin/profile"
                        : "/dashboard/user/profile"
                    }
                  >
                    <BsPersonCircle
                      onClick={() => setIsOpen((prev) => !prev)}
                      className=" w-12 h-12 text-black"
                    />
                  </Link>
                )
              ) : (
                <Link
                  to="/login"
                  className=" bg-[#00000033] w-full h-full flex items-center justify-center text-white rounded-full"
                >
                  Login
                </Link>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
