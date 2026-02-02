import { useForm } from "react-hook-form";
import ContactBanner from "./ContactBanner";
import { motion } from "framer-motion";
// import bgContact from "/assets/bg-contact.jpg"
import bgContact from "/assets/food-banner/img-3.jpg";
import useScrollToTop from "../../components/ui/useScrollToTop";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
  useScrollToTop();

  const onSubmit = async (data) => {};

  return (
    <div>
      <ContactBanner></ContactBanner>

      <div>
        <p
          className="text-center text-xl md:text-3xl text-black pt-10 
            font-bold  uppercase mb-5 z-30 underline underline-offset-8"
        >
          Contact Information
        </p>
<p className="text-sm mx-8 md:text-lg md:w-[840px] mb-16 font-medium text-center md:mx-auto text-shadow text-black md:pt-5 "> Have questions about our food, services, or anything else?
            We're always ready to help. Reach out to us anytime —
            we usually respond within 24 hours.</p>
        <div className="md:flex  justify-center gap-20 mx-8 md:mx-0">
          <motion.div
            animate={{ x: [0, 0, 0], y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            className="flex flex-col items-start bg-slate-100 text-xl font-semibold rounded-xl p-5 md:p-10 gap-3 mb-8 md:mb-0" 
          >
            <p className="uppercase text-2xl font-bold">Phone Number:</p>
            <p> +880 123 456 789</p>
          </motion.div>
          <motion.div
            animate={{ x: [0, 0, 0], y: [0, 20, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1,
            }}
            className="flex flex-col items-start  bg-slate-100 text-xl font-semibold rounded-xl p-5 md:p-10 gap-3  mb-8 md:mb-0"
          >
            <p className="uppercase text-2xl font-bold">Email Address:</p>
            <p>contact@epiqura.com</p>
          </motion.div>
          <motion.div
            animate={{ x: [0, 0, 0], y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            className="flex flex-col items-start bg-slate-100 text-xl font-semibold rounded-xl p-5 md:p-10 gap-3  mb-8 md:mb-0"
          >
            <p className="uppercase text-2xl font-bold">Address: </p>
            <p>Uttara, Dhaka-1230</p>
          </motion.div>
        </div>
      </div>

      <div>
        <p
          className="text-center text-xl md:text-3xl text-black mt-25 md:mt-44 
            font-bold mb-10 uppercase z-30 underline underline-offset-8"
        >
          Contact Form
        </p>

        <div
          className=" mx-auto border-4 
                 relative  rounded-xl border-[#ffffff] bg-linear-to-r from-[#02020284] to-[#00000051] h-[600px] w-10/12 md:w-3/4 text-white mb-10"
        >
          <img
            className="absolute w-full h-full rounded-xl object-cover opacity-50"
            src={bgContact}
            alt=""
          />

          <form onSubmit={handleSubmit(onSubmit)} className="relative w-10/12  md:w-3/5 mx-auto">
           
              <div className="z-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 md:mt-14">
                  <motion.div
                    initial={{ opacity: 0, scale: 1, x: -100 }}
                    // animate={{ opacity: 1, scale: 1, x:0 }}
                    transition={{ duration: 2, type: "spring" }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  >
                    <label className="md:text-xl font-bold text-white">Name</label>
                    <input
                      className="w-full mt-3 h-12   bg-[#ffa11db2] md:text-lg placeholder:text-white px-4 py-3 rounded-lg outline-none border-2 border-[#fcdf94] focus:border-[#fcbe23] transition"
                      placeholder="Enter Your Name"
                      required
                      {...register("Name")}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 1, x: 100 }}
                    // animate={{ opacity: 1, scale: 1, x:0 }}
                    transition={{ duration: 2, type: "spring" }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  >
                    <label className="md:text-lg font-bold text-white">
                      Email
                    </label>
                    <input
                      className="w-full mt-3 h-12  bg-[#ffa11db2] md:text-lg placeholder:text-white px-4 py-3 rounded-lg outline-none border-2 border-[#fcdf94] focus:border-[#fcbe23] transition  mb-3"
                      placeholder="Enter Your Email"
                      required
                      {...register("Email")}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  // animate={{ opacity: 1, scale: 1}}
                  transition={{ duration: 2, type: "spring" }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                >
                  <label className="md:text-lg font-bold text-white">Phone</label>
                  <input
                    className="w-full mt-3 h-12  bg-[#ffa11db2] md:text-lg placeholder:text-white px-4 py-3 rounded-lg outline-none border-2 border-[#fcdf94] focus:border-[#fcbe23] transition mb-3"
                    placeholder="Enter Your Phone Number"
                    required
                    {...register("Phone")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 1, y: 100 }}
                  // animate={{ opacity: 1, scale: 1, y:0 }}
                  transition={{ duration: 2, type: "spring" }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                >
                  <label className="md:text-lg font-bold text-white ">
                    Message
                  </label>
                  <textarea
                    className="textarea textarea-bordered md:text-lg font-semibold mt-3 w-full h-28 
                                placeholder:text-lg  bg-[#ffa11db2]   placeholder:text-white px-4 py-3 rounded-xl outline-none border-2 border-[#fcdf94] focus:border-[#fcbe23] transition"
                    placeholder="Write your message here"
                    required
                    name=""
                    id=""
                    {...register("description")}
                  ></textarea>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                className="w-full mt-10 border-2 mx-auto text-center bg-[#ffa11db2] text-white px-8 py-3 font-bold md:text-lg  rounded-lg uppercase "
              >
                Submit
              </motion.button>
           
          </form>
        </div>
      </div>



      
    </div>
  );
};

export default ContactUs;
