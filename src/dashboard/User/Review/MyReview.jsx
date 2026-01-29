import React from "react";
import { motion } from "framer-motion";
import { Mosaic } from "react-loading-indicators";
import { FaCheck, FaStar, FaStarHalf, FaTimes, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReview = ({
  PendingReviews,
  ApprovedReviews,
  isPendingPendingReviews,
  isPendingApprovedReviews,
  refetchPendingReviews,
}) => {
  const axiosSecure = useAxiosSecure();

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: `Are you sure? you want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviewRequest/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          toast.success(`This review has been deleted!`);
          refetchPendingReviews();
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-10">

  <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-6">
    Your Reviews
  </h2>

  {isPendingPendingReviews && (
    <div className="py-20 flex justify-center">
      <div className="scale-[0.7]">
        <Mosaic
          size="small"
          color={["#000000", "#475569", "#4b5563", "#52525b"]}
        />
      </div>
    </div>
  )}

  {ApprovedReviews.length === 0 && !isPendingApprovedReviews && (
    <div className="h-72 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-slate-600">
        No Reviews Yet
      </h3>
      <p className="text-sm text-slate-500 mt-1">
        You haven’t submitted any reviews.
      </p>
    </div>
  )}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
    {ApprovedReviews.map((review) => (
      <motion.div
        key={review._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative rounded-3xl bg-white border-l-4 p-6 shadow-sm hover:shadow-xl transition
          ${
            review.status === "Approved"
              ? "border-emerald-500"
              : review.status === "Pending"
              ? "border-amber-400"
              : "border-rose-500"
          }
        `}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img
              src={review.img}
              alt=""
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-slate-800">
                {review.name}
              </p>
              <p className="text-xs text-slate-500">{review.email}</p>
            </div>
          </div>

          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full
              ${
                review.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700"
                  : review.status === "Pending"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-rose-50 text-rose-700"
              }
            `}
          >
            {review.status}
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {review.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
            <p className="font-semibold text-emerald-700 mb-1">Pros</p>
            <p className="text-slate-600">{review.pros}</p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
            <p className="font-semibold text-rose-700 mb-1">Cons</p>
            <p className="text-slate-600">{review.cons}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(Math.floor(review.rating))].map((_, i) => (
            <FaStar key={i} className="text-amber-400 text-sm" />
          ))}
          {review.rating % 1 !== 0 && (
            <FaStarHalf className="text-amber-400 text-sm" />
          )}
          {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
            <FaStar key={i} className="text-slate-300 text-sm" />
          ))}
          <span className="text-xs text-slate-500 ml-2">
            {review.rating}/5
          </span>
        </div>

        <div className="flex justify-between items-center border-t pt-3 text-xs text-slate-500">
          <span>{new Date(review.date).toLocaleDateString()}</span>
          <span className="px-3 py-1 rounded-full bg-slate-100">
            {review.recommend ? "Recommended" : "Not Recommended"}
          </span>
        </div>
      </motion.div>
    ))}
  </div>

  <h2 className="text-xl sm:text-2xl font-bold text-slate-700 mb-6">
    Review Requests
  </h2>

  {PendingReviews.length === 0 && !isPendingPendingReviews && (
    <div className="h-72 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-slate-600">
        No Pending Reviews
      </h3>
      <p className="text-sm text-slate-500 mt-1">
        You don’t have any review requests.
      </p>
    </div>
  )}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {PendingReviews.map((review) => (
      <motion.div
        key={review._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-3xl bg-white border-l-4 border-amber-400 p-6 shadow-sm hover:shadow-xl transition"
      >
        <button
          onClick={() => handleDeleteReview(review._id)}
          className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition"
        >
          Cancel
        </button>

        <p className="font-semibold text-slate-800 mb-1">{review.name}</p>
        <p className="text-xs text-slate-500 mb-3">{review.email}</p>

        <p className="text-sm text-slate-700 mb-4">
          {review.description}
        </p>

        <div className="flex justify-between items-center text-xs text-slate-500 border-t pt-3">
          <span>{new Date(review.date).toLocaleDateString()}</span>
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700">
            Pending
          </span>
        </div>
      </motion.div>
    ))}
  </div>

  <Toaster position="top-right" />
</div>

  );
};

export default MyReview;
