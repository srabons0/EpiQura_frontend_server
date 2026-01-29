import { motion } from "framer-motion";
import useDataLoader from "../../hooks/useDataLoader";
import { useEffect, useState } from "react";
import RecipeDetails from "../../components/Shared/Recipes/RecipeDetails";

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState([]);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/foodItems/BestSellers").then((res) => setBestSellers(res.data));
  }, [data]);

  return (
    <section className="w-11/12 mx-auto mt-20 mb-16 md:my-20">

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543] ">
          Best Sellers
        </h2>
        <p className="text-gray-600 mt-3">
          Our most loved dishes that customers keep coming back for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-5 md:mx-0">
        {bestSellers.slice(0, 3).map((item, index) => (
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
            <div className="p-5 " >
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 text-xs mb-3">{item.ingredients}</p>
              <div className="flex justify-between items-center">
              </div>
                <div className="flex justify-between items-center mt-4">
                <span className="text-[#ff9543] font-bold">৳{item.realPrice}</span>
                  <RecipeDetails id={item._id}></RecipeDetails>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
