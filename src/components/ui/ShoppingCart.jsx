import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ShoppingCart = ({scroll = 400}) => {
  const [isBottom, setIsBottom] = useState(false);
useEffect(() => {
  const target = document.getElementById("cart-trigger");
  if (!target) return;
// console.log( "target", target);
  const observer = new IntersectionObserver(
    ([entry]) => {
        // console.log("entry.isIntersecting", entry.isIntersecting);
      setIsBottom(!entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(target);
  return () => observer.disconnect();
}, []);
  return (
    <motion.div
    className=""
    >
        <div id="cart-trigger" className={`h-[${scroll}] absolute `} />
      <Link to="/addToCart">
        <motion.button
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg
    ${isBottom ? "fixed bottom-6 right-8 md:right-6" : "hidden"}
  `}
        >
          <AiOutlineShoppingCart className="text-xl" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ShoppingCart;
