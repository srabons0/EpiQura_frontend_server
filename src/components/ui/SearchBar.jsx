import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.input
            ref={inputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, height: 40, opacity: 1, x: -45 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 bg-[#00000053] font-medium text-white rounded-full px-4 py-1 focus:outline-none shadow-sm absolute right-8"
          />
        )}
      </AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className=""
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className=" p-3 bg-[#00000033] cursor-pointer hover:bg-[#00000075] border-none btn-circle mr-3 md:mr-5  z-30"
        >
          <IoSearch className="md:w-7 md:h-7 text-white" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SearchBar;
