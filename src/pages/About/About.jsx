import React from "react";
import { motion } from "framer-motion";
import heroImg from "/assets/food-banner/img-5.jpg"; // Replace with high-quality image
import foodImg from "/assets/food-banner/img-3.jpg"; // Replace with high-quality food image
import { Link } from "react-router-dom";
import useScrollToTop from "../../components/ui/useScrollToTop";

export default function About() {
  useScrollToTop();
  return (
    <section className="w-11/12 mx-auto my-20 pt-15">

      {/* Hero Section */}
      <div className="relative mb-20 ">
        <img
          src={heroImg}
          alt="Safe Restaurant"
          className="w-full h-96 md:h-[500px] object-cover rounded-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 rounded-3xl flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-[#FFA823]"
          >
            Welcome to EpiQura
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white mt-4 text-lg md:text-xl max-w-3xl"
          >
            A self-owned restaurant committed to fresh, hygienic, and delicious meals. Enjoy home-style cooking with safety and quality at the core.
          </motion.p>
        </div>
      </div>

      {/* About & Mission */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Text */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="flex flex-col gap-6"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#FF9543] mb-3">Our Story</h2>
            <p className="text-gray-700 text-lg">
              EpiQura is a self-owned restaurant founded with the passion to serve authentic, hygienic, and home-cooked style meals. Every dish is prepared with care, ensuring the highest quality for our customers.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#FF9543] mb-3">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              To provide fresh, safe, and delicious meals that make every dining experience memorable. Safety, hygiene, and customer satisfaction are our top priorities.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.img
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          src={foodImg}
          alt="Delicious Food"
          className="w-full rounded-3xl shadow-lg"
        />
      </motion.div>

      {/* Small Attractive Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#FFF3E0] p-6 rounded-2xl text-center shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#FF9543] mb-2">Hygienic Kitchen</h3>
          <p className="text-gray-700">Our kitchen follows strict hygiene standards to ensure safe and fresh meals.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#FFF3E0] p-6 rounded-2xl text-center shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#FF9543] mb-2">Fresh Ingredients</h3>
          <p className="text-gray-700">Only high-quality, fresh ingredients are used in every dish we serve.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#FFF3E0] p-6 rounded-2xl text-center shadow-lg"
        >
          <h3 className="text-xl font-bold text-[#FF9543] mb-2">Fast & Safe Delivery</h3>
          <p className="text-gray-700">Meals are packed safely and delivered promptly to ensure freshness and satisfaction.</p>
        </motion.div>
      </div>
{/* Additional Attractive Sections */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#E0F7FA] p-6 rounded-2xl text-center shadow-lg"
  >
    <h3 className="text-xl font-bold text-[#00ACC1] mb-2">Locally Sourced</h3>
    <p className="text-gray-700">
      We use locally sourced ingredients to ensure freshness and support local farmers.
    </p>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#FFF3E0] p-6 rounded-2xl text-center shadow-lg"
  >
    <h3 className="text-xl font-bold text-[#FF9543] mb-2">Customer Favorites</h3>
    <p className="text-gray-700">
      Our menu features dishes loved by our customers, carefully curated for taste and quality.
    </p>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#E8F5E9] p-6 rounded-2xl text-center shadow-lg"
  >
    <h3 className="text-xl font-bold text-[#43A047] mb-2">Quick Order & Delivery</h3>
    <p className="text-gray-700">
      Enjoy a fast and seamless ordering experience with prompt delivery right to your door.
    </p>
  </motion.div>
</div>
{/* Why Choose Us Section */}
<section className="mb-20">
  <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold text-[#FF9543] mb-4">Why Choose EpiQura?</h2>
    <p className="text-gray-700 max-w-2xl mx-auto">
      From hygiene to taste, we ensure every aspect of your dining experience is perfect. Here’s why our customers trust us.
    </p>
  </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {[
      { title: "100% Hygienic", desc: "Strict hygiene standards in every kitchen.", icon: "🧼" },
      { title: "Fresh Ingredients", desc: "Only high-quality, fresh ingredients.", icon: "🥗" },
      { title: "Fast Delivery", desc: "Quick, safe, and reliable delivery.", icon: "🚀" },
      { title: "Customer Support", desc: "Friendly support for a worry-free experience.", icon: "📞" },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className="bg-white rounded-2xl p-6 text-center shadow-lg flex flex-col items-center gap-4"
      >
        <span className="text-5xl">{item.icon}</span>
        <h3 className="text-xl font-semibold text-[#FF9543]">{item.title}</h3>
        <p className="text-gray-700">{item.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* CTA Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold text-[#FF9543] mb-4">
          Experience Safe & Delicious Meals Today!
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          Explore our menu and enjoy freshly prepared, hygienic meals with complete peace of mind.
        </p>
        <Link to="/recipes/beef"><motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#FF9543] text-white font-bold py-3 px-8 rounded-full text-xl"
        >
          Order Now
        </motion.button></Link>
      </motion.div>
    </section>
  );
}
