import { motion } from "framer-motion";

export default function BestSellers() {
  const bestSellers = [
    {
      name: "Margherita Pizza",
      price: "450৳",
      img: "/assets/food/Crispy-Skin-Chicken.webp",
      desc: "Classic Italian pizza with fresh mozzarella and basil.",
    },
    {
      name: "Cheeseburger Deluxe",
      price: "350৳",
      img: "/assets/food/Traybake-Dinner.JPG",
      desc: "Juicy beef patty with cheddar cheese and fresh veggies.",
    },
    {
      name: "Chocolate Lava Cake",
      price: "250৳",
      img: "/assets/food/pastas.JPG",
      desc: "Warm chocolate cake with molten center.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto mt-20 mb-16 md:my-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543] ">
        Best Sellers 
        </h2>
        <p className="text-gray-600 mt-3">
          Our most loved dishes that customers keep coming back for.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-5 md:mx-0">
        {bestSellers.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0,scale:.9, y: 50 }}
            whileInView={{ opacity: 1,scale:1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.08 }}
            className="bg-white shadow-sm shadow-[#ff9543] rounded-xl overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#ff9543] font-bold">{item.price}</span>
                 <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                  Order Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
