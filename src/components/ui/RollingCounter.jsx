import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RollingCounter({
  initial = 1,
  min = 1,
  max = 20,
  onChange,
}) {
  const [count, setCount] = useState(initial);
  const [dir, setDir] = useState(1);

  const increment = () => {
    setCount((prev) => {
      if (prev < max) {
        setDir(1);
        const newCount = prev + 1;
        onChange?.(newCount);
        return newCount;
      }
      return prev;
    });
  };
  const decrement = () => {
    setCount((prev) => {
      if (prev > min) {
        setDir(-1);
        const newCount = prev - 1;
        onChange?.(newCount);
        return newCount;
      }
      return prev;
    });
  };

  // const increase = () => {
  //   setDir(1);
  //   setCount((c) => c + 1);
  // };

  // const decrease = () => {
  //   if (count === 1) return;
  //   setDir(-1);
  //   setCount((c) => c - 1);
  // };

  return (
    <div className="flex items-center ">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        onClick={decrement}
        className=" bg-black w-7 h-7 text-center text-white font-bold rounded-full"
      >
        −
      </motion.button>

      <div className="relative w-10 h-8 overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={dir}>
          <motion.span
            key={count}
            custom={dir}
            initial={{ y: dir > 0 ? 20 : -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: dir > 0 ? -20 : 20, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute text-lg font-bold"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        onClick={increment}
        className="w-7 h-7 text-center text-white font-bold bg-black rounded-full"
      >
        +
      </motion.button>
    </div>
  );
}
