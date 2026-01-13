import useLoader from "../../hooks/useLoader";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import img1 from "/assets/food-banner/banner2.jpeg";
import { Link } from "react-router-dom";
import { FaMoneyCheck, FaRegTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useScrollToTop from "../../components/ui/useScrollToTop";
import toast, { Toaster } from "react-hot-toast";

const AddToCart = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  useScrollToTop();

  const [cart, isPending, refetch] = useLoader(
    "cart",
    `/orderFood?email=${user.email}`,
    !!user?.email && !loading
  );
  // console.log(cart);

  const handleAllItemCancel = (id) => {
    Swal.fire({
      title: "Are You Certain You Want To Cancel All Item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`http://localhost:3000/orderFood?email=${user.email}`)
          .then(() => {
            toast.success("All order has been canceled.");
            refetch();
          });
      }
    });
  };
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are You Certain You Want To Cancel This Item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`http://localhost:3000/orderFood/${id}`).then(() => {
          toast.success("Order has been canceled.");
          refetch();
        });
      }
    });
  };
  const totalPrice = cart.reduce(
    (total, item) => total + item.realPrice * item.quantity,
    0
  );
  return (
    <div className="">
      <img
        className=" w-full h-full absolute top-0 left-0 opacity-80 object-cover lg:h-[470px]"
        src={img1}
        alt=""
      />
      <div
        className="mb-10 overflow-x-hidden lg:h-[470px] w-full relative top-0 
             bg-linear-to-r from-[#161616] to-[#0000002d] lg:ps-40"
      ></div>
      <p
        className="text-center text-5xl absolute top-[30%] left-[20%] text-white mt-5 
            font-semibold mb-20 flex items-center justify-center text-shadow"
      >
        Your Shopping Cart
      </p>

      <div className="flex justify-around items-center">
        {cart.length === 0 ? (
          <button
            className="bg-gray-500 text-gray-300 cursor-not-allowed opacity-50   -top-8 left-96
                      px-8 py-3 font-bold text-lg  rounded-badge flex gap-2 items-center"
          >
            <FaRegTrashAlt /> Cancel All Item
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => handleAllItemCancel()}
            className="bg-linear-to-r from-[#fe0000] to-[#ff0808a4]  flex gap-2 items-center  text-white px-8 py-3 font-bold text-lg rounded-xl"
          >
            <FaRegTrashAlt /> Cancel All Item
          </motion.button>
        )}
        <p
          className=" text-3xl font-semibold mb-20 mt-5 uppercase underline
                 underline-offset-4"
        >
          total cost : ৳{totalPrice}
        </p>

        {cart.length === 0 ? (
          <button
            className="bg-gray-500 text-gray-300 cursor-not-allowed opacity-50   -top-8 left-96
                      px-8 py-3 font-bold text-lg  rounded-badge flex gap-2 items-center"
          >
            <FaMoneyCheck /> Pay For Items
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="bg-linear-to-r  from-[#ffa620] to-[#fecb4a]   -top-8 left-96 text-white px-8 py-3 font-bold text-lg  rounded-badge"
          >
            <Link to="/payment" className=" flex gap-2 items-center">
              <FaMoneyCheck /> Pay For Items
            </Link>
          </motion.button>
        )}
      </div>

      <div className=" grid grid-cols-4 gap-5 mx-20 mt-5">
        {cart.map((food) => (
          <div key={food._id}>
            <div className="p-4 pt-5 rounded-lg shadow-2xl">
              <img
                className="w-52  h-48 rounded-md mx-auto "
                src={food.img}
                alt=""
              />
              <p className="text-lg font-semibold text-center mt-3">
                {food.name}
              </p>
              <p className="text-base font-semibold text-center my-1 ">
                Price: ৳{food.realPrice}
              </p>
              {food.quantity && (
                <p className="text-base font-semibold text-center my-1 ">
                  Quantity: {food.quantity}
                </p>
              )}
              <p className="text-base font-semibold text-center mb-5">
                Cooking time: {food.cookingTime}min
              </p>
              <div className="flex justify-center gap-2 my-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCancel(food._id)}
                  className=" py-2 px-5 bg-red-500 text-white rounded-xl"
                >
                  cancel
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!cart.length && (
        <div
          className="text-center text-4xl text-slate-300 h-64 flex items-center font-semibold  
                justify-center"
        >
          You need to add an item to your shopping cart!
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddToCart;
