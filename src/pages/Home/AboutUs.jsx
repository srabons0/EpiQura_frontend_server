import aboutUs from "/assets/logo/about.JPG";
import { motion } from "framer-motion";


export default function AboutUs() {
  return (
    <section className="w-11/12 mx-auto my-20">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543]">
          About Us
        </h2>
        <p className="text-gray-600 mt-3">
          Learn more about our story, mission, and the passion behind our delicious food.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <motion.div
        initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: 0.5, }}>
          <img
            className="w-full rounded-2xl shadow-md object-cover"
            src={aboutUs}
            alt="About our restaurant"
          />
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: .5, }}>
          <h3 className="text-2xl font-semibold text-[#ff9543] mb-4">
            Bringing You Fresh & Authentic Flavors
          </h3>
          <p className="text-gray-700 leading-relaxed mb-5">
            We started our journey with a simple mission — to serve fresh,
            quality, and delicious food that brings people together. From local
            dishes to international favorites, we focus on creating flavors that
            feel like home.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Our chefs prepare every dish with passion and the finest ingredients.
            Whether you're craving something spicy, sweet, or savory, we’ve got
            something special for every food lover.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">•</span>
              100% fresh and high-quality ingredients
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">•</span>
              Experienced and passionate chefs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600 text-xl">•</span>
              Fast delivery and excellent customer service
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
