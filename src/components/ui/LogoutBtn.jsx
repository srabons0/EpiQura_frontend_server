import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const LogoutBtn = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
     const { user, logoutUser } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      className=""
      ref={dropdownRef}
    >
        <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}>
      <motion.button 
        initial={{ opacity: 0, scale: -0.5, x: 50 }}
        animate={{ opacity: 2, scale: 1.1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="btn hidden md:block  btn-ghost btn-circle mr-10 border-none w-12 h-12 z-30 hover:bg-[#00000075]"
      >
        {user ? (
          user.photoURL ? (
            <img
             onClick={() => setIsOpen((prev) => !prev)}
              className="w-12 h-12 rounded-full border-2 "
              src={user.photoURL}
              alt=""
            />
          ) : (
            <BsPersonCircle  onClick={() => setIsOpen((prev) => !prev)} className=" w-12 h-12 " />
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.97 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute right-4"
          >
            <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }} onClick={()=>{ logoutUser().then(()=>setIsOpen(false))}}
                className="transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center] text-white px-8 py-3 font-bold text-lg rounded-xl "> Sign Out</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogoutBtn;
