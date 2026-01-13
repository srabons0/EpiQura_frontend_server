import { useState } from "react";
import { motion } from "framer-motion";

const FoodCounter = ({ initial = 1, min = 1, max = 20, onChange }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount(prev => {
      const newCount = Math.min(prev + 1, max);
      if (onChange) onChange(newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount(prev => {
      const newCount = Math.max(prev - 1, min);
      if (onChange) onChange(newCount);
      return newCount;
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        -
      </button>

      <motion.span
        key={count} // key triggers animation on change
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="text-lg font-bold w-6 text-center"
      >
        {count}
      </motion.span>

      <button
        onClick={increment}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
};

export default FoodCounter;
