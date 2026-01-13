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
    data.get("/foodItem/TopFoodList").then((res) => setTopFood(res.data));
  }, [data]);
  // console.log(topFood);
  return (
    <div className="mt-20 ">
      <p className="text-center font-bold text-[#ff9543] underline underline-offset-4 text-xl md:text-3xl mb-6 md:mb-12">
        Our Top Food List
      </p>
      <p className="mx-8 md:mx-auto text-center md:text-xl md:w-5/12 font-semibold text-black mb-10 md:mb-16">
        Taste our finest dishes, from timeless classics to exciting new flavors, each one a delicious experience!
      </p>

      {topFood.length === 0 && (
        <div className="flex mx-auto pt-32 pb-40 w-8 h-8">
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
      <div className="grid grid-cols-2 gap-3 md:gap-7 mx-3 md:mx-20 overflow-y-hidden overflow-x-hidden ">
        {topFood.slice(0, cut).map((food, index) => (
          <div key={food._id}>
  <motion.div
    initial={{ opacity: 0, scale: 1, y: 50, x: 50 }}
    transition={{ duration: 1, delay: index*.1, type: "spring" }}
    whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-col-reverse md:flex-row justify-between items-center border-2 border-[#ff9543] rounded-lg py-3 md:py-6 px-4 md:px-10 gap-3 md:gap-0"
  >
    {/* Text Content */}
    <div className="flex  flex-col gap-2 md:gap-3 w-full md:w-2/3">
      <p className="text-lg md:text-2xl font-bold">{food.name}</p>

      <p className="flex items-center gap-1 md:gap-2 text-sm md:text-lg font-medium">
        <span className=" md:text-lg font-semibold ">Cooking Time:</span>
        <FaRegClock />
        {food.cookingTime} min
      </p>

      <p className="flex items-center gap-2 md:text-lg font-medium">
        <span className="font-semibold">Rating:</span>
        <FaStar />
        {food.rating}
      </p>

      <RecipeDetails id={food._id}></RecipeDetails>
    </div>

    {/* Image */}
    <img
      className="w-full md:w-[275px] h-28 md:h-44 rounded-xl object-cover"
      src={food.img}
      alt={food.name}
    />
  </motion.div>
</div>

        ))}
      </div>
      {topFood.length && (
        <div className=" flex justify-center mt-10 md:mt-20 overflow-y-hidden">
          {cut < 10 ? (
            <motion.button
              onClick={() => setCut(cut + 6)}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1 }}
              className=" border-2 bg-[#c7c7c711] cursor-pointer text-[#ff9543] border-[#ff9543] py-3 font-bold w-2/5 md:w-1/4 md:text-xl rounded-md"
            >
              See More
            </motion.button>
          ) : (
            <Link
              className="py-3 w-2/5 md:w-1/4 border-2 text-center text-[#ff9543] border-[#ff9543] bg-[#c7c7c711] font-bold cursor-pointer md:text-xl rounded-md"
              to="/recipes/Beef"
            >
              <motion.button
                 whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1 }}
                className=""
              >
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
