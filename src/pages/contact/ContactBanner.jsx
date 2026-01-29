import { motion } from "framer-motion";
import bgContact from "/assets/food-banner/bg-contact.jpg";

const ContactBanner = () => {
  return (
   <div className="h-[600px] relative w-full md:h-[600px]">
  <img
    className="w-full h-full object-cover absolute top-0 left-0"
    src={bgContact}
    alt="Contact Background"
  />
  <div className="h-full w-full relative bg-gradient-to-r from-[#1c1a1aad] to-[#86868611] flex flex-col justify-center items-center px-4 text-center">
    
    <motion.h1
      initial={{ opacity: 0, scale: 1.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 text-shadow uppercase"
    >
      Contact Us
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, scale: 1.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="text-base sm:text-lg md:text-xl text-white max-w-xl md:max-w-2xl text-center"
    >
      We’d love to hear from you! Whether you have questions or feedback, feel free to reach out. Our team is here to assist you and ensure you have the best experience possible.
    </motion.p>

  </div>
</div>

  );
};

export default ContactBanner;
