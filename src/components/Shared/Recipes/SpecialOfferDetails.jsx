import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegClock, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useDataLoader from "../../../hooks/useDataLoader";
import RollingCounter from "../../ui/RollingCounter";
import toast, { Toaster } from "react-hot-toast";

const SpecialOfferDetails = ({ id, offer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const data = useDataLoader();
  const { user } = useAuth();
  const [item, setItem] = useState([]);
  const { title } = offer;
  // console.log(title);
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
    offer: title,
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
        data.post("https://epiqura-backend-server.onrender.com/orderFood", foodOrder).then(() => {
          toast.success("This Dish Has Been Added To Cart");
        });
      }
    });
  };

  const backdrop = {
    visible: { opacity: 1 },
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
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-2 bg-orange-400 hover:bg-[#fbb47d] text-white rounded-lg font-medium transition"
      >
        Claim Offer
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 px-4"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-100 shadow-xl md:w-full md:max-w-220 max-h-[90vh] overflow-y-auto"
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center">
                  <img
                    className="w-full sm:w-72 h-48 sm:h-72 object-cover rounded-xl"
                    src={item.img}
                    alt=""
                  />

                  <div className="flex-1 w-full ">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                      {item.name}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-sm sm:text-base">
                          <span className="font-semibold">Ingredients: </span>
                          {item.ingredients}
                        </p>

                        {item.additionalNote && (
                          <p className="mt-2 text-sm sm:text-base">
                            <span className="font-semibold">
                              Dish Details:{" "}
                            </span>
                            {item.additionalNote}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-end mr-10">
                        <div className="flex flex-col gap-2 text-sm sm:text-base">
                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Cooking:</span>
                            <FaRegClock /> {item.cookingTime} min
                          </p>

                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Rating:</span>
                            <FaStar /> {item.rating || 0}
                          </p>

                          <p>
                            <span className="font-semibold">Price:</span> ৳
                            {item.realPrice}
                          </p>

                          <p>
                            <span className="font-semibold">Delivery:</span> ৳99
                          </p>
                        </div>
                        <div className="block md:hidden">
                          <RollingCounter
                            initial={1}
                            min={1}
                            max={50}
                            onChange={(n) => setQuantity(n)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <RollingCounter
                        initial={1}
                        min={1}
                        max={50}
                        onChange={(n) => setQuantity(n)}
                      />
                    </div>

                    <div className="md:mt-6 flex flex-col sm:flex-row gap-4 items-center">
                      {!user ? (
                        <Link to="/login" className="w-full sm:w-auto">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-64 border-2 text-[#ff9543] border-[#ff9543] py-3 font-bold rounded-md"
                          >
                            Add to cart
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleAddToCart}
                          className="w-full sm:w-64 border-2 text-[#ff9543] border-[#ff9543] md:py-3 py-2 font-bold rounded-md"
                        >
                          Add to cart
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                        className="w-full sm:w-40 px-4 py-2 md:py-3 bg-red-500 font-medium text-white rounded-lg hover:bg-red-400 transition"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SpecialOfferDetails;
