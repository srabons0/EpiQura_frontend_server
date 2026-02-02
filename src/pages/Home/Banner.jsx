import { RiArrowRightLine } from "react-icons/ri";
import img2 from "/assets/food-banner/banner-3.jpg";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={img2}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div
        className="relative min-h-[520px] md:min-h-[650px] lg:min-h-[770px] 
                  bg-linear-to-r from-[#1f1e1e] to-[#0000001e]
                  px-6 md:px-12 lg:px-40
                  flex flex-col justify-center "
      >
        <motion.h1
          initial={{ opacity: 0, scale: 1.2, x: 30, y: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.3, delay: 1 }}
          className="
        text-white font-bold text-shadow
        text-2xl sm:text-3xl md:text-5xl
        leading-snug md:leading-[70px] 
        mb-4
      "
        >
          Taste the World
          <br /> One Dish at a Time
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 1.1 }}
          className="
        text-white text-shadow font-medium
        text-xs sm:text-base md:text-lg
        max-w-full md:max-w-[600px] lg:max-w-[840px]
        leading-relaxed
        mb-6
      "
        >
          Welcome to EpiQura, where food is more than just a meal — it’s an
          experience. We bring you the finest gourmet recipes, expert cooking
          tips, and food inspiration from around the globe.{" "}
          <span className="hidden lg:block">
            {" "}
            Whether you're a seasoned chef or a passionate foodie, our curated
            dishes will elevate your culinary journey.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 1.2 }}
          className="flex gap-2 lg:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              const width = window.innerWidth;
              let top = 1200;
              if (width <= 640) top = 800;
              else if (width <= 1024) top = 900;
              window.scroll({ top: top, behavior: "smooth" });
            }}
            className="
          bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)]
          bg-size-[200%_auto] hover:bg-position-[right_center]
          transition-all duration-500
          text-white font-semibold
          text-xs md:text-lg
          px-3 py-1 md:px-8 md:py-3
          rounded-full
          flex items-center gap-1 lg:gap-2
        "
          >
            Order Now <RiArrowRightLine className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="
          bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)]
          bg-size-[200%_auto] hover:bg-position-[right_center]
          transition-all duration-500
          text-white font-semibold
          text-xs md:text-lg
          px-3 py-1 md:px-8 md:py-3
          rounded-full
        "
          >
            <Link
              to="/recipes/Beef"
              className="flex items-center gap-1 lg:gap-2"
            >
              Explore Recipes{" "}
              <MdOutlineRestaurantMenu className="w-4 h-4 lg:w-5 lg:h-5" />
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
