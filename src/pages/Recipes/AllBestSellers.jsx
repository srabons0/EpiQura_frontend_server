import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useDataLoader from "../../hooks/useDataLoader";
import RecipeDetails from "../../components/Shared/Recipes/RecipeDetails";
import { Mosaic } from "react-loading-indicators";


export default function AllBestSellers() {
  const [bestSellers, setBestSellers] = useState([]);
const [cut, setCut] = useState(6);
  const [time, setTime] = useState(5000);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/foodItems/BestSellers").then((res) => setBestSellers(res.data));
  }, [time]);
  setTimeout(() => {
    if (bestSellers.length === 0) {
      setTime(0);
    }
    console.log(bestSellers);
  }, time);

  return (
    <section className="w-11/12 mx-auto mt-20 mb-16 md:my-20">

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-center font-bold text-[#ff9543] underline underline-offset-4 text-2xl md:text-3xl mb-6 md:mb-12">
          Best Sellers
        </h2>
        <p className="text-gray-600 mt-3">
          Our most loved dishes that customers keep coming back for.
        </p>
      </div>
{bestSellers.length === 0 && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:mx-0 ">
        {bestSellers.slice(0, cut).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.08 }}
            className="bg-white shadow-sm relative shadow-[#ff9543] rounded-xl overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="py-5 pl-5" >
              <h3 className=" text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 text-xs mb-3">{item.ingredients}</p>
              
                <div className="flex w-full items-center lg:justify-between lg:gap-0 gap-20">
                <span className="text-[#ff9543] font-bold">৳{item.realPrice}</span>
                 <span className="w-11/12 lg:w-1/2 mr-5"> <RecipeDetails id={item._id}></RecipeDetails></span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
       {cut < bestSellers.length && (
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
    </section>
  );
}
