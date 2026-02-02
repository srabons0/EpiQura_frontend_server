import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaRegClock, FaStar } from "react-icons/fa";
import { Mosaic } from "react-loading-indicators";
import useDataLoader from "../../hooks/useDataLoader";
import RecipeDetails from "../../components/Shared/Recipes/RecipeDetails";


const RecipesLoader = () => {
  const { name } = useParams();
  const [time, setTime] = useState(5000);
  const data = useDataLoader();
  const [foodItem, setFoodItem] = useState([]);
  const [cut, setCut] = useState(6);

  useEffect(() => {
    data.get(`/foodItem/${name}`).then((res) => {
      setFoodItem(res.data);
      if (foodItem.length !== 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, [data, name, time]);
  setTimeout(() => {
    if (foodItem.length === 0) {
      setTime(0);
    }
    console.log(foodItem);
  }, time);

  return (
    <div className="mt-5 md:mt-20 ">
      <p className="text-center font-bold underline text-[#ff9543] underline-offset-5 text-2xl md:text-3xl mb-16 uppercase">
        {name}{" "}
      </p>
      {foodItem.length === 0 && (
        <div className="flex mx-auto pt-32 pb-40 w-8 h-8 scale-60 lg:scale-80">
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
      <div className="grid grid-cols-2 gap-2  lg:gap-7 mx-1 lg:mx-20 overflow-y-hidden overflow-x-hidden ">
        {foodItem.slice(0, cut).map((food, index) => (
          <div key={food._id}>
            <motion.div
              initial={{ opacity: 0, scale: 1, y: 50, x: 50 }}
              transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
              //   animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col-reverse lg:flex-row justify-between h-full items-center border-2 border-[#ff9543] rounded-lg pb-2 lg:py-6  lg:px-10 gap-3 lg:gap-0"
            >
              <div className="flex  flex-col gap-1 md:gap-3 w-full md:w-2/3 px-2">
                <p className="text-base lg:text-2xl font-bold">{food.name}</p>

                <p className="flex items-center gap-0.5 lg:gap-2 md:text-lg font-medium">
                  <span className="font-semibold">Rating:</span>
                  <FaStar className="text-yellow-400" />
                  {food.rating ? food.rating : 0}
                </p>
                <p className="flex items-center gap-1 md:gap-2 text-sm md:text-lg font-medium">
                  <span className=" md:text-lg font-semibold ">Price:</span>৳
                  {food.realPrice}
                </p>
<div className="lg:w-9/12">
                <RecipeDetails id={food._id}></RecipeDetails></div>
              </div>

              <img
                className="w-full md:w-[275px] h-28 md:h-44 rounded-t-lg lg:rounded-xl object-cover"
                src={food.img}
                alt={food.name}
              />
            </motion.div>
          </div>
        ))}
      </div>
      {cut < foodItem.length && (
        <div className=" flex justify-center mt-10 md:mt-20 overflow-y-hidden">
          <motion.button
            onClick={() => setCut(cut + 6)}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1 }}
            className=" border-2 bg-[#c7c7c711] cursor-pointer text-[#ff9543] border-[#ff9543] py-3 font-bold w-2/5 md:w-1/4 md:text-xl rounded-md"
          >
            See More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default RecipesLoader;
