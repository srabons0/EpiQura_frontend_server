import { useState } from "react";
import { motion } from "framer-motion"
import { RiArrowRightLine } from "react-icons/ri";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: send email to backend
    console.log("Newsletter subscribed:", email);

    setEmail(""); // clear input
  };

  return (
    <section className="w-11/12 mx-auto my-36">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff9543]">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mt-3">
          Get the latest food updates, special discounts, and exclusive offers delivered directly to your inbox.
        </p>
      </div>

      {/* Newsletter Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <motion.input  
        initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: 0.5, }}
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 rounded-xl outline-none border-2 border-[#fcdf94] focus:border-[#fcbe23] transition"
        />
<motion.button
                 initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, }}
            transition={{ duration: .8, delay: 0.5, }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={()=> window.scrollTo(0,1000)}
                    className="bg-linear-to-r from-[#fca31f] to-[#fad370] text-white px-8 py-3 font-bold text-lg  rounded-4xl flex gap-1 items-center">Subscribe <RiArrowRightLine className="w-6 h-6" /></motion.button>
       
      </form>
    </section>
  );
}
