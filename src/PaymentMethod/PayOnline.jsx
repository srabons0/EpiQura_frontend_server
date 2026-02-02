import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";
import toast, { Toaster } from "react-hot-toast";
import stripe from "/assets/logo/payment-stripe.png";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_kEY);
const notify = () => toast.success("Successfully your order has been placed!");
const PayOnline = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [transcription, setTranscription] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const transactionId = localStorage.getItem("transactionId");
    // console.log(transactionId);
    setTranscription(transactionId);
  }, []);

  useEffect(() => {
    modalRef.current?.close();
  }, [transcription]);

  const [cart, isPending, refetch] = useLoader(
    "cart",
    `/orderFood?email=${user.email}`,
    !!user?.email && !loading
  );
  // console.log(cart.length);

  const totalPrice = cart.reduce(
    (total, item) => total + item.realPrice * item.quantity,
    0
  );
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  const [users] = useLoader(
    "user",
    `/user?email=${user.email}`,
    !!user?.email && !loading
  );

  const handleConfirmOrder = async () => {
    const timer = setTimeout(async () => {
      setError("");
    }, 5000);
    if (users?.address && users?.phone) {
      setProcessing(true);
      await axiosSecure.delete(`/orderFood?email=${user.email}`).then(() => {
        setSuccess(
          `Your order has been confirmed!
             Please prepare for the delivery.`
        );
        toast.success("Successfully your order has been placed!");
        setProcessing(false);
        setSucceeded(true);
        setTimeout(() => {
          navigate("/");
          localStorage.removeItem("transactionId");
        }, 3000);
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
    <div className="mb-20 px-2">
      <div className="card w-full md:w-1/3 md:mx-auto rounded-2xl shadow-xl overflow-hidden ">
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
                {totalItem}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">
                total cost:
              </span>
              <span className="text-xl font-semibold uppercase">
                ৳{totalPrice}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-xl font-semibold uppercase ">
                delivery cost:
              </span>
              <span className="text-xl font-semibold uppercase"> ৳99</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-xl font-semibold uppercase">pay on:</span>
            <button disabled={totalPrice === 0} className={`${
                totalPrice === 0
                  ? "cursor-not-allowed opacity-40":"cursor-pointer"}`}>
              <img 
                onClick={() => modalRef.current?.showModal()}
                className={`w-18 h-16 rounded-lg  hover:scale-105 `}
                src={stripe}
                alt=""
              /></button> 
            </li>
            {transcription && (
              <p className="text-base"> Transition id :{transcription}</p>
            )}

            <li className="text-lg font-medium mt-4">
              We’ll call you after your order is confirmed.
            </li>
          </ul>

          {transcription ? (
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
          ) : (
            <button className="bg-gray-500 text-gray-300 cursor-not-allowed opacity-50 px-8 py-3 font-bold text-lg text-center ">
              Confirm Order
            </button>
          )}

          <div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            <Toaster position="top-right" />
          </div>
        </div>
      </div>

      <dialog
        ref={modalRef}
        className="modal bg-[#ffffffdd] border-4 border-[#8f8f8f49] w-[95%] px-6 md:w-1/2 mx-auto h-120 md:h-[68%] my-auto"
      >
        <Elements stripe={stripePromise}>
          <CheckOutForm
            transcription={transcription}
            setTranscription={setTranscription}
          />
        </Elements>

        <button
          onClick={() => modalRef.current?.close()}
          className="btn btn-sm btn-circle btn-ghost text-lg absolute right-6 top-4"
        >
          ✕
        </button>
      </dialog>
    </div>
  );
};

export default PayOnline;
