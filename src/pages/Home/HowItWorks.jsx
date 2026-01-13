import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Choose Your Food",
      desc: "Browse our menu and select your favorite dishes from a variety of options.",
    },
    {
      step: 2,
      title: "Place Your Order",
      desc: "Add items to your cart, customize if needed, and confirm your order in seconds.",
    },
    {
      step: 3,
      title: "Enjoy Fast Delivery",
      desc: "Sit back and relax while we deliver your food quickly to your doorstep.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-14 md:my-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543]">
          How It Works
        </h2>
        <p className="text-gray-600 mt-3">
          Ordering delicious food has never been easier. Just follow these simple steps!
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, }}
            transition={{ duration: 0.7, delay: item.step * 0.2, ease: "easeInOut"}}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 text-orange-500 font-bold text-xl rounded-full">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold text-[#ff9543] mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
