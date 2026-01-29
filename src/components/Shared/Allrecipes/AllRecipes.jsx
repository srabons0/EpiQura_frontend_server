import CategoryData from "../CategoryData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AllRecipes = () => {
  const category = CategoryData();

  return (
    <div className="pt-10 md:pt-20">
      <p className="text-2xl md:text-3xl text-[#ff9543] text-center mt-16 mb-5 md:mb-8 font-bold underline underline-offset-4">
       All Recipes
      </p>
      <div className="grid grid-cols-6 gap-3 md:gap-0 mx-5 md:grid-cols-10 ">
        {category.map((data, idx) => (
          <Link
            to={`/recipes/${data.name}`}
            key={idx}
            className=" flex flex-col 
                    items-center gap-2 justify-center font-medium md:font-semibold text-sm md:text-lg"
           
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 md:w-32 md:h-32 md:ms-5 mt-5 rounded-full"
              src={data.img}
            />
            <p>{data.name}</p>
          </Link>
        ))}
      </div>
      {!category.length && (
        <div className="flex py-20 justify-center items-center">
          <span
            className="loading
                 loading-dots loading-lg"
          ></span>
        </div>
      )}
    </div>
  );
};

export default AllRecipes;
