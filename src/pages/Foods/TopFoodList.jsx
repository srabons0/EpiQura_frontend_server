import React, { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";
import useDataLoader from "../../hooks/useDataLoader";
import { motion } from "framer-motion";
import { FaRegClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import RecipeDetails from "../../components/Shared/Recipes/RecipeDetails";

const TopFoodList = () => {
  const [topFood, setTopFood] = useState([]);
  const [cut, setCut] = useState(6);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/foodItems/TopFood").then((res) => setTopFood(res.data));
  }, [data]);
  
  return (
   <div className="mt-16 md:mt-20">
  <p className="text-center font-bold text-[#ff9543] underline underline-offset-4 text-lg sm:text-xl md:text-3xl mb-4 md:mb-12">
    Our Top Food List
  </p>

  <p className="mx-6 md:mx-auto text-center text-sm sm:text-base md:text-lg md:w-5/12 text-gray-600 mb-8 md:mb-16">
    Taste our finest dishes, from timeless classics to exciting new flavors,
    each one a delicious experience!
  </p>

  {topFood.length === 0 && (
    <div className="flex justify-center pt-28 pb-36">
      <Mosaic
        color={[
          "#000000",
          "#475569",
          "#4b5563",
          "#52525b",
          "#404040",
          "#262626",
          "#1c1917",
        ]}
        size="small"
        text=""
        textColor=""
      />
    </div>
  )}

 <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-7 mx-3 md:mx-20 overflow-hidden">

    {topFood.slice(0, cut).map((food, index) => (
      <motion.div
        key={food._id}
        initial={{ opacity: 0, y: 40, x: 40 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.9, delay: index * 0.1, type: "spring" }}
        viewport={{ once: true }}
        className="flex flex-col-reverse md:flex-row items-center justify-between border-2 border-[#ff9543] rounded-lg py-4 md:py-6 px-4 md:px-10 gap-4"
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full md:w-2/3">
          <p className="text-base sm:text-lg md:text-2xl font-bold">
            {food.name}
          </p>

          <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium">
            <span className="font-semibold">Rating:</span>
            <FaStar />
            {food.rating}
          </p>

          <p className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-lg font-medium">
            <span className="font-semibold">Price:</span>
            ৳{food.realPrice}
          </p>

          <RecipeDetails id={food._id} />
        </div>

        <img
          src={food.img}
          alt={food.name}
          className="w-full md:w-[275px] h-32 sm:h-36 md:h-44 rounded-xl object-cover"
        />
      </motion.div>
    ))}
  </div>

  {topFood.length > 0 && (
    <div className="flex justify-center mt-10 md:mt-20 overflow-hidden">
      {cut < 10 ? (
        <motion.button
          onClick={() => setCut(cut + 6)}
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 1 }}
          className="border-2 bg-[#c7c7c711] text-[#ff9543] border-[#ff9543] py-2.5 md:py-3 font-bold w-2/3 sm:w-1/2 md:w-1/4 text-sm sm:text-base md:text-xl rounded-md"
        >
          See More
        </motion.button>
      ) : (
        <Link
          to="/recipes/Beef"
          className="border-2 bg-[#c7c7c711] text-[#ff9543] border-[#ff9543] py-2.5 md:py-3 font-bold w-2/3 sm:w-1/2 md:w-1/4 text-sm sm:text-base md:text-xl rounded-md text-center"
        >
          <motion.button whileHover={{ scale: 0.95 }} whileTap={{ scale: 1 }}>
            See All Recipe
          </motion.button>
        </Link>
      )}
    </div>
  )}
</div>

  );
};

export default TopFoodList;
