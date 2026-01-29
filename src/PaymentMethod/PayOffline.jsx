import { motion } from "framer-motion";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const PayOffline = () => {
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [users] = useLoader(
    "user",
    `/user?email=${user.email}`,
    !!user?.email && !loading,
  );

  const [cart, isPending, refetch] = useLoader(
    "cart",
    `/orderFood?email=${user.email}`,
    !!user?.email && !loading,
  );
  // console.log(cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.realPrice * item.quantity,
    0,
  );
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  const handleConfirmOrder = async () => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    if (users?.address && users?.phone) {
      setProcessing(true);
      const info = {
        email: users?.email,
        name: users?.name,
        number: users?.phone,
        address: users?.address,
        date: new Date(),
        price: Number(totalPrice),
        payment: "Cash",
        paymentStatus: "Pending",
        status: "Pending",
        cartsId: cart.map((item) => item._id),
        orderedItems: cart.map((item) => item),
      };

      await axiosSecure
        .post("/save-order", info)
        .then(async (res) => {
          // console.log(res.data);
          if (res.data.insertedId) {
            await axiosSecure
              .delete(`/orderFood?email=${user.email}`)
              .then(() => {
                setSucceeded(true);
                setProcessing(false);
                setSuccess(
                  "Your order has been confirmed! Please prepare the cash upon delivery.",
                );
                // console.log("Successfully");
                toast.success("Successfully your order has been placed!");
                setTimeout(() => {
                  navigate("/");
                  localStorage.removeItem("transactionId");
                }, 3000);
              });
          }
        })
        .catch(() => {
          toast.error("Failed to place order.");
          setProcessing(false);
        });
    } else if (!users?.phone && !users?.address) {
      setError("Please set your address and phone number first!");
      return timer;
    } else if (!users?.address) {
      setError("Please set your address first!");
      return timer;
    } else if (!users?.phone) {
      setError("Please set your phone number first!");
      return timer;
    }
  };

  return (
    <div className="mb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1b4332]">
            Order Summary
          </h2>

          <ul className="mt-6 flex flex-col gap-3 text-base sm:text-lg">
            <li className="flex justify-between">
              <span className="font-semibold uppercase">Total items:</span>
              <span className="font-semibold uppercase">{totalItem}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold uppercase">Total cost:</span>
              <span className="font-semibold uppercase">৳{totalPrice}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold uppercase">Delivery cost:</span>
              <span className="font-semibold uppercase">৳99</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold uppercase">Pay on:</span>
              <span className="font-semibold uppercase">Cash</span>
            </li>
            <li className="mt-4 text-sm sm:text-base font-medium text-gray-600">
              We’ll call you after your order is confirmed.
            </li>
          </ul>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <button
              disabled={totalPrice === 0}
              onClick={handleConfirmOrder}
              className={`${
                totalPrice === 0
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                  : "text-white shadow-[0_0_20px_#eee] transition-all duration-500 bg-[linear-gradient(to_right,#28a745_0%,#71dd8a_51%,#28a745_100%)] bg-size-[200%_auto] hover:bg-position-[right_center]"
              } btn-block px-9 py-4 block text-center text-sm font-medium uppercase text-white no-underline`}
            >
              {processing
                ? "Processing..."
                : succeeded
                  ? "order has been placed successfully!"
                  : "Confirm Order"}
            </button>
          </motion.div>

          <div className="mt-4 text-center text-sm">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
            <Toaster position="top-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayOffline;
