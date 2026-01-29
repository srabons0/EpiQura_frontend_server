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
   <div className="relative w-full pb-20 overflow-hidden">
  <div className="relative h-[280px] sm:h-[350px] lg:h-[470px]">
    <img
      className="absolute inset-0 w-full h-full object-cover opacity-80"
      src={img1}
      alt=""
    />
    <div className="absolute inset-0 bg-linear-to-r from-[#161616] to-[#0000002d]" />

    <div className="relative z-10 h-full flex items-center md:justify-start justify-center">
      <h1 className="text-3xl sm:text-4xl md:ms-60 lg:text-5xl font-bold text-white text-center tracking-wide md:text-right">
        Your Shopping Cart
      </h1>
    </div>
  </div>

  <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 mt-10">
    <div className=" flex mt-20 relative flex-row lg:flex-row gap-6 items-center justify-between">
      {cart.length === 0 ? (
        <button className="bg-gray-500 text-gray-300 cursor-not-allowed opacity-50 lg:px-8 px-4 py-1.5 lg:py-3 font-semibold rounded-full flex gap-2 text-xs md:text-base items-center">
          <FaRegTrashAlt /> Cancel All Items
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAllItemCancel}
          className="bg-gradient-to-r from-red-600  text-xs md:text-base  to-red-400 text-white lg:px-8 px-4 py-1.5 lg:py-3 font-semibold rounded-full flex gap-2 items-center shadow-lg"
        >
          <FaRegTrashAlt /> Cancel All Items
        </motion.button>
      )}

      <p className="text-xl absolute -top-13 left-25 md:static sm:text-2xl font-semibold uppercase underline underline-offset-4">
        Total Cost : ৳{totalPrice}
      </p>

      {cart.length === 0 ? (
        <button className="bg-gray-500  text-xs md:text-base  text-gray-300 cursor-not-allowed opacity-50 lg:px-8 px-4 py-1.5 lg:py-3 font-semibold rounded-full flex gap-2 items-center">
          <FaMoneyCheck /> Pay For Items
        </button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="bg-linear-to-r from-[#ffa620] to-[#fecb4a] text-white lg:px-8 px-4 py-1.5 lg:py-3 font-semibold rounded-full  text-xs md:text-base  shadow-lg"
        >
          <Link to="/payment" className="flex gap-2 items-center">
            <FaMoneyCheck /> Pay For Items
          </Link>
        </motion.button>
      )}
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cart.map((food) => (
        <div
          key={food._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
        >
          <div className="p-5">
            <img
              className="w-full h-44 object-cover rounded-xl"
              src={food.img}
              alt=""
            />

            <h3 className="text-lg font-semibold text-center mt-4">
              {food.name}
            </h3>

            <p className="text-center font-medium mt-1">
              Price: ৳{food.realPrice}
            </p>

            {food.quantity && (
              <p className="text-center font-medium">
                Quantity: {food.quantity}
              </p>
            )}

            <p className="text-center font-medium mb-4">
              Cooking Time: {food.cookingTime} min
            </p>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCancel(food._id)}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-medium"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {!cart.length && (
    <div className="h-64 flex items-center justify-center text-center text-2xl sm:text-3xl text-slate-400 font-semibold">
      You need to add an item to your shopping cart!
    </div>
  )}

  <Toaster position="top-right" reverseOrder={false} />
</div>

  );
};

export default AddToCart;
