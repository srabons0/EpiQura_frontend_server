import { motion } from "framer-motion";
import bgContact from "/assets/food-banner/bg-contact.jpg";

const ContactBanner = () => {
  return (
    <div className="h-[600px] relative w-full">
      <img
        className="w-full h-full object-cover absolute  top-0 left-0 "
        src={bgContact}
        alt=""
      />
      <div className="mb-10  h-full w-full relative top-0  bg-linear-to-r from-[#1c1a1aad] to-[#86868611] ">
        <motion.h1
          initial={{ opacity: 0, scale: 1.5 }}
          // animate={{ opacity: 2, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl absolute top-[35%] left-[42%] text-white mt-5 
            font-bold mb-20 text-shadow uppercase"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 1.5 }}
          // animate={{ opacity: 2, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-xl w-2/5 absolute top-[50%] left-[32%] text-white mt-5 
            font-semibold mb-20"
        >
          We’d love to hear from you! Whether you have questions, feedback feel
          free to reach out. Our team is here to assist you and ensure you have
          the best experience possible.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactBanner;
