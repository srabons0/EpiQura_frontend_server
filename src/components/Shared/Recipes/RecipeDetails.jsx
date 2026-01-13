import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { FaRegClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useDataLoader from "../../../hooks/useDataLoader";
import RollingCounter from "../../ui/RollingCounter";
import toast, { Toaster } from "react-hot-toast";

const RecipeDetails = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // console.log(quantity);
  const data = useDataLoader();
  const { user } = useAuth();
  const [item, setItem] = useState([]);
  // console.log(id);
  // console.log(item);
  //   useScrollToTop("smooth");

  useEffect(() => {
    data.get(`/foodItemId/${id}`).then((res) => {
      setItem(res.data);
    });
  }, [id]);

  const foodOrder = {
    foodId: item._id,
    type: item.type,
    realPrice: item.realPrice,
    rating: item.rating,
    name: item.name,
    quantity: quantity,
    location: item.location,
    ingredients: item.ingredients,
    img: item.img,
    menuSection: item.menuSection,
    cookingTime: item.cookingTime,
    additionalNote: item.additionalNote,
    status: "pending",
    email: user?.email,
  };

  const handleAddToCart = () => {
    Swal.fire({
      title: "Are You Certain You Want To Added To Cart This Item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        data.post("http://localhost:3000/orderFood", foodOrder).then(() => {
          toast.success("This Dish Has Been Added To Cart");
        });
      }
    });
  };

  const backdrop = {
    visible: { opacity: 1 },
    //    hidden: { opacity: 0 }
  };
  const modal = {
    hidden: {
      rotateX: -90,
      rotateY: -90,
      opacity: 0.5,
      x: "-50%",
      transition: { duration: 0.6, delay: 0.1, ease: "easeIn" },
      scale: 0.5,
    },
    visible: {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      x: "0%",
      scale: 1,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
    exit: {
      rotateX: 90,
      rotateY: 90,
      opacity: 0.5,
      x: "50%",
      scale: 0.8,
      transition: { duration: 1, delay: 0.1, ease: "easeIn" },
    },
  };

  return (
    <div className="">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(true)}
        className="w-full md:w-1/2 border-2 cursor-pointer border-[#ff9543] text-[#ff9543] bg-[#fa81000e] py-3 font-bold  md:text-xl rounded-md md:mt-4 mt-2"
      >
        See Details
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0  flex items-center justify-center"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl  pb-3 px-6 mt-17 w-1/2 shadow-xl relative"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="  h-[550px]">
                <motion.div className="flex flex-col-reverse justify-around px-10 items-center py-8">
                  <div className="">
                    <p className="text-2xl font-semibold mt-5 mb-4">
                      {" "}
                      {item.name}
                    </p>
                    {/* <p className="text-xl "><span className="text-xl font-semibold">Location:
                    </span> {item.location}</p> */}
                    <div className="flex gap-6">
                      <div className="w-2/3">
                        <p>
                          <span className=" font-semibold">Ingredients: </span>
                          {item.ingredients}
                        </p>

                        {item.additionalNote && (
                          <p className=" ">
                            <span className=" font-semibold">
                              Dish Details:{" "}
                            </span>{" "}
                            {item.additionalNote}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="flex items-center gap-1">
                          <span className=" font-semibold">Cooking: </span>
                          <FaRegClock />
                          {item.cookingTime}min
                        </p>
                        <p className="flex items-center gap-1">
                          <span className=" font-semibold">Rating: </span>
                          <FaStar />
                          {item.rating ? item.rating : 0}
                        </p>
                        <p className=" ">
                          <span className=" font-semibold">price: </span> ৳
                          {item.realPrice}
                        </p>
                        <p className=" ">
                          <span className=" font-semibold">
                            Delivery cost:{" "}
                          </span>
                          ৳99
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-5 items-center mt-6">
                      <div>
                        {!user ? (
                          <Link to="/login">
                            <motion.button
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-[300px] border-2 text-[#ff9543] border-[#ff9543]  py-3 font-bold  text-xl rounded-md"
                            >
                              Add to cart
                            </motion.button>
                          </Link>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className="w-[300px] border-2 text-[#ff9543] border-[#ff9543]  py-3 font-bold  text-xl rounded-md"
                          >
                            Add to cart
                          </motion.button>
                        )}
                      </div>

                      <RollingCounter
                        initial={1}
                        min={1}
                        max={50}
                        onChange={(n) => setQuantity(n)}
                      />
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                        className="w-[200px] px-4 py-3 bg-red-500 font-medium text-white rounded-lg hover:bg-red-400 transition"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                  <img
                    className="w-full md:w-[210px] h-28 md:h-[220px] oject-cover rounded-xl"
                    src={item.img}
                    alt=""
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RecipeDetails;
