import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import img1 from "/assets/logo/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mt-40">
      <div className=" bg-[#ffa230db] text-white pt-28 px-10 md:px-20">
        <div className="md:flex justify-between">
          <div className="md:ms-16 mb-10 md:mb-0">
            <div className="flex items-center mb-5">
              <motion.img
                drag
                dragConstraints={{
                  left: -50,
                  right: 390,
                  top: -150,
                  bottom: 250,
                }}
                whileTap={{ scale: 0.8 }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  opacity: 0.8,
                  transition: { duration: 0.4 },
                }}
                className="w-20"
                src={img1}
                alt=""
              />
              <motion.p
                whileTap={{ scale: 0.8 }}
                className="  font-bold uppercase   md:text-3xl text-xl"
              >
                EpiQura
              </motion.p>
            </div>
            <p className=" md:text-lg  text-sm font-semibold md:w-96">
              Bringing you the best flavors, one dish at a time. Follow us for
              the latest updates, special offers, and delicious inspiration
            </p>
          </div>

          <div className="flex flex-col md:gap-10">
            <div className="md:ms-24 text-sm flex gap-3 flex-wrap md:gap-8 md:text-xl md:mr-40  w-full md:w-3/4 font-bold ">
              <Link to="/" className="col-span-2">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  Home
                </motion.p>
              </Link>
              <Link to="/recipes/beef">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  Recipe
                </motion.p>
              </Link>
              <Link to="/dashboard/admin/home">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  Dashboard
                </motion.p>
              </Link>
              <Link to="/about">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  About us
                </motion.p>
              </Link>
              <Link to="/contact">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer"
                >
                  Contact us
                </motion.p>
              </Link>
            </div>
            <div className="md:flex items-start justify-center md:pr-20">
              <div className=" md:mr-20">
                <p className="text-xl md:text-3xl  font-bold mt-10 mb-3  md:my-5">
                  Contact Us
                </p>
                <p className="text-xs  md:text-lg font-medium">
                  <span className="md:text-xl  text-base font-bold">Address: </span>
                  House 123, Road 7, Sector 11, Uttara, Dhaka
                </p>
                <p className=" md:text-lg font-medium">
                  <span className=" md:text-2xl  font-bold">Phone:</span>{" "}
                  +880-1234-567890
                </p>
              </div>

              <div className="">
                <p className="text-lg md:text-2xl font-bold mt-5 mb-3">
                  Social Media
                </p>
                <div className="flex gap-4 ">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <FaFacebook className="w-7 h-7 md:w-8  md:h-8 cursor-pointer" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.instagram.com/"
                    target="_blank"
                  >
                    <FaInstagram className="w-7 h-7 md:w-8  md:h-8 cursor-pointer" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.linkedIn.com/"
                    target="_blank"
                  >
                    <FaLinkedin className="w-7 h-7 md:w-8  md:h-8 cursor-pointer" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://web.whatsapp.com/"
                    target="_blank"
                  >
                    <FaWhatsapp className="w-7 h-7 md:w-8  md:h-8 cursor-pointer" />{" "}
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center pt-20 pb-8">
          © 2024 EpiQura. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
