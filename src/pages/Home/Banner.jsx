import { RiArrowRightLine } from "react-icons/ri";
import img2 from "/assets/food-banner/banner-3.jpg";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <img
        className=" w-full h-full absolute top-0 lg:h-[770px] left-0 opacity-80 "
        src={img2}
        alt=""
      />
      <div className="mb-10 overflow-x-hidden lg:h-[770px] w-full relative top-0  bg-linear-to-r from-[#1f1e1e] to-[#00000006] lg:ps-40">
        <motion.h1
          initial={{ opacity: 0, scale: 1.2, x: 100, y: -100 }}
          animate={{ opacity: 2, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="lg:text-5xl text-3xl text-shadow font-bold mb-5 text-white ps-10  pt-40 lg:pt-56 leading-10 lg:leading-[70px]"
        >
          Taste the World
          <br /> One Dish at a Time
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 1.1, x: -300, y: 0 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg w-[840px] font-bold text-shadow text-white pt-5 "
        >
          Welcome to EpiQura, where food is more than just a meal it`s an
          experience. We bring you the finest gourmet recipes, expert cooking
          tips, and food inspiration from around the globe. Whether you`re a
          seasoned chef or a passionate foodie, our curated selection of dishes
          and culinary insights will elevate your cooking and dining
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 1.1, x: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center"
        >
          <motion.div whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}>
          <motion.button
            onClick={() =>
              window.scroll({
                top: 1200,
                behavior: "smooth",
              })
            }
            className="transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center] cursor-pointer text-white px-8 py-3 font-bold text-lg mt-10 rounded-4xl ms-5 flex gap-1 items-center"
          >
            Order Now <RiArrowRightLine className="w-6 h-6" />
          </motion.button>
</motion.div>
          <motion.div whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}>
          <motion.button
            className="transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center] cursor-pointer text-white px-8 py-3 font-bold text-lg mt-10 rounded-4xl ms-5"
          >
            <Link to="/recipes/Beef" className=" flex gap-1 items-center">
              {" "}
              Explore Recipes <MdOutlineRestaurantMenu className="w-6 h-6" />
            </Link>
          </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
