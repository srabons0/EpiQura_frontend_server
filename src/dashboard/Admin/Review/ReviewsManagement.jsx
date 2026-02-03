import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaStar,
  FaSearch,
  FaCheck,
  FaTimes,
  FaTrash,
  FaRegTrashAlt,
  FaStarHalf,
} from "react-icons/fa";
import useLoader from "../../../hooks/useLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Mosaic } from "react-loading-indicators";

const ReviewsManagement = ({AllReviewsRefetch}) => {
  const [filter, setFilter] = useState("All");
  const [option, setOption] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [reviews, isPending, refetch] = useLoader(
    "reviewRequest",
    `/reviewRequest`
  );
  console.log(reviews);
  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((a, b) => a + b.rating, 0) / totalReviews
  ).toFixed(1);
  const filteredReviews = reviews.filter((r) => {
    const matchFilter = filter === "All" ? true : r.status === filter;
    return matchFilter;
  });

  const handleReviewStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure? you want to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/reviewRequest`, { status, id });
        console.log(res.data);
        if (res.data.updateReviewStatus.acknowledged && res.data.deleteReview.deletedCount > 0) {
          toast.success(`This review has been ${status}!`);
          refetch();
          AllReviewsRefetch()
        }
      }
    });
  };

  return (
    <div className="min-h-screen  lg:px-6 md:px-10 py-10">
      <div className="flex flex-col justify-end  md:flex-row gap-4 mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border lg:w-1/5 border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Reviews</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      
      </div>

      {isPending && (
        <div className="mt-20 flex justify-center">
          <div className="inline-block scale-[0.7] origin-top">
            <Mosaic
              size="small"
              color={[
                "#000000",
                "#475569",
                "#4b5563",
                "#52525b",
                "#404040",
                "#262626",
                "#1c1917",
              ]}
              text=""
              textColor=""
            />
          </div>
        </div>
      )}

      
       { reviews.length === 0 && !isPending &&(<div className="flex flex-col items-center justify-center h-80 text-center">
      <h2 className="text-xl font-bold text-gray-600">
        No Reviews Available
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        You don’t have any Reviews yet or all Reviews are Checked.
      </p>
    </div>)}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative rounded-2xl bg-linear-to-br from-slate-50 to-white border-l-6  shadow-md hover:shadow-xl transition-shadow p-5 ${
              review.status === "Approved"
                ? "border-green-500"
                : review.status === "Pending"
                ? "border-yellow-400"
                : "border-red-500"
            } `}
          >
            
            <div
              className={`absolute top-0 left-0 h-full w-1 rounded-l-2xl `}
            />

           
            <div className="flex items-start justify-between mb-4">
             <div className="flex items-center gap-3">
               <img className="w-12 h-12 rounded-full object-cover" src={review.img} alt="" />
               <div>
                <p className="font-semibold text-slate-900 leading-tight">
                  {review.name}
                </p>
                <p className="text-xs text-slate-500">{review.email}</p>
              </div>
</div>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                  review.status === "Approved"
                    ? "bg-green-50 text-green-700"
                    : review.status === "Pending"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {review.status}
              </span>
            </div>

           
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {review.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-green-50 border border-green-100 rounded-lg p-2">
                <p className="font-semibold text-green-700 mb-0.5">Pros</p>
                <p className="text-slate-600">{review.pros}</p>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-2">
                <p className="font-semibold text-red-700 mb-0.5">Cons</p>
                <p className="text-slate-600">{review.cons}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 my-2">
              {review.dish} 
            </p>
            <div className="flex justify-between">
             
              <div className="flex items-center gap-1 mb-3">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(review.rating)
                        ? "text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
                {[
                  ...Array(
                    Math.ceil(review.rating) - Math.floor(review.rating)
                  ),
                ].map((_, i) => (
                  <FaStarHalf key={i} className="text-sm text-amber-400" />
                ))}
                {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-sm text-slate-300" />
                ))}
                <span className="text-xs text-slate-500 ml-2">
                  {review.rating}/5
                </span>
              </div>
            </div>
          
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex flex-col items-center gap-2 text-xs text-slate-500">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100">
                  {review.recommend ? "Recommended" : "Not Recommended"}
                </span>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => handleReviewStatus(review._id, "Approved")}
                  className="p-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition"
                >
                  <FaCheck />
                </button>

                <button
                  onClick={() => handleReviewStatus(review._id, "Rejected")}
                  className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                >
                  <FaTimes />
                </button>

                
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>

  );
};

export default ReviewsManagement;
