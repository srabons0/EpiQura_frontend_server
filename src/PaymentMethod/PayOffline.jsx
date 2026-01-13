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
    !!user?.email && !loading
  );

  const [cart, isPending, refetch] = useLoader(
    "cart",
    `/orderFood?email=${user.email}`,
    !!user?.email && !loading
  );
  // console.log(cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.realPrice * item.quantity,
    0
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
                  "Your order has been confirmed! Please prepare the cash upon delivery."
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
    <div className="mb-20">
      <div className="card w-1/3 mx-auto shadow-lg ">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Order Summary</h2>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">
                total items:
              </span>
              <span className="text-xl font-semibold uppercase">
                {" "}
                {totalItem}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">
                total cost:
              </span>
              <span className="text-xl font-semibold uppercase">
                {" "}
                ৳{totalPrice}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">
                delivery cost:
              </span>
              <span className="text-xl font-semibold uppercase"> ৳99</span>
            </li>
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">pay on:</span>
              <span className="text-xl font-semibold uppercase"> cash</span>
            </li>
            <li className="text-lg font-medium mt-4">
              We’ll call you after your order is confirmed.
            </li>
          </ul>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <button
              onClick={handleConfirmOrder}
              className=" btn-block px-9 py-4 block text-center font-medium uppercase text-white no-underline  shadow-[0_0_20px_#eee] transition-all duration-500 bg-[linear-gradient(to_right,#28a745_0%,#71dd8a_51%,#28a745_100%)] bg-size-[200%_auto] hover:bg-position-[right_center]"
            >
              {processing
                ? "Processing..."
                : succeeded
                ? "Your order has been placed successfully!"
                : "Confirm Order"}
            </button>
          </motion.div>
          <div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            <Toaster position="top-right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayOffline;
