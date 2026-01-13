import foodApp from "/assets/logo/food_app.JPG";
import { motion } from "framer-motion";

export default function AppDownload() {
  return (
    <section className="w-11/12 mx-auto my-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543]">
          Download Our App
        </h2>
        <p className="text-gray-600 mt-3">
          Order food faster, track your delivery, and enjoy exclusive app-only
          offers.
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center">
        {/* Image / Illustration */}
        <motion.div
        initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: 0.5, }}
            className="flex justify-center">
          <img
            src={foodApp}
            alt="Mobile App"
            className="w-full max-w-sm md:max-w-md rounded-2xl object-cover shadow-lg"
          />
        </motion.div>

        {/* Text + Buttons */}
         <motion.div
        initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: .5, }}>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Get Your Favorite Food With Just One Tap
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Download our mobile app and enjoy a seamless ordering experience.
            Track your food in real-time, customize your meals, and get special
            discounts only available through the app.
          </p>

          {/* Store Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Play Store */}
            <a
              href="https://play.google.com/store/apps?hl=en"
              target="_blank"
              className="flex items-center gap-3 bg-linear-to-r from-[#fad370] to-[#fca31f] text-white px-5 py-3 rounded-xl shadow hover:opacity-90 transition"
            >
              <img
                src="https://c.clc2l.com/t/g/o/google-playstore-Iauj7q.png"
                alt="Google Play"
                className="w-6 h-6 object-cover"
              />
              <div className="text-left">
                <p className="text-xs">GET IT ON</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </a>

            {/* App Store */}
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="flex items-center gap-3 bg-linear-to-r from-[#fad370] to-[#fca31f] text-white px-5 py-3 rounded-xl shadow hover:opacity-90 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
                alt="App Store"
                className="w-6 h-6 object-cover"
              />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </a>
          </div>
       </motion.div>
      </div>
    </section>
  );
}
