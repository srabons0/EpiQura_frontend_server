import { motion } from "framer-motion";

const AboutDhaka = () => {
    return (
     <section className="w-11/12 mx-auto  my-36">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543]">
          Fast Food Delivery in Dhaka
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Dhaka, the vibrant capital of Bangladesh, is a paradise for food lovers. 
          With <span className="font-semibold text-orange-500">EpiQura</span>, you get quick access 
          to a rich variety of dishes — from traditional Bangladeshi delicacies to 
          modern fusion flavors — all delivered straight to your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-12 w-5/6 mx-auto">
        <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: 0.7, delay: 1 * 0.2, ease: "easeInOut"}}
            className="p-6 border-t-8 border-[#ff9543] bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Dine in the Easy Way</h3>
          <p className="text-gray-700 mb-2">
            Ordering with <span className="font-medium text-orange-500">EpiQura</span> is simple and hassle-free. 
            Whether you're craving comfort food, fast favorites, or something new, our platform makes it easy 
            to browse, select, and checkout in seconds.
          </p>
          <p className="text-gray-700">
            Just open the app or website, enter your location, choose your restaurant, 
            add items to your basket, and confirm your order. Then sit back, relax, and let us handle the rest!
          </p>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: 0.7, delay: 2 * 0.2, ease: "easeInOut"}}
        className="p-6 border-t-8 border-[#ff9543] bg-white shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Browse Top Menus</h3>
          <p className="text-gray-700 mb-2">
            We’ve hand-picked the best restaurants in Dhaka to bring you a first-class selection of cuisines. 
            From globally loved fast-food chains to artisan pizzerias and gourmet local eateries, <span className="font-medium text-orange-500">EpiQura</span> ensures there’s something for everyone.
          </p>
          <p className="text-gray-700">
            Explore a wide variety of menu items, check reviews, and discover new favorites with confidence. 
            Our constantly updated listings mean you’ll always have fresh options at your fingertips.
          </p>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, }}
            transition={{ duration: 0.7, delay: 3 * 0.2, ease: "easeInOut"}}
        className="p-6 border-t-8 border-[#ff9543] bg-white md:col-span-2 shadow-lg rounded-xl hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-4">Classic Dhaka Dishes</h3>
          <p className="text-gray-700 mb-2">
            Experience the true flavors of Dhaka with iconic local dishes like <span className="font-medium text-orange-500">Morog Pulao, biryani, naans, kebabs,</span> and spicy curries. 
            Each dish is prepared with love and authentic ingredients, bringing the city’s culinary richness to your table.
          </p>
          <p className="text-gray-700">
            Whether you’re feeding a small craving or a hearty appetite, <span className="font-medium text-orange-500">EpiQura</span> guarantees a satisfying, delicious delivery experience every time.
          </p>
        </motion.div>
      </div>
    </section>
       
    );
};

export default AboutDhaka;