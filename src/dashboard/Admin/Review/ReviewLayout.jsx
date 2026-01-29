import { useState } from "react";
import useLoader from "../../../hooks/useLoader";
import { AnimatePresence, motion } from "framer-motion";
import ReviewsManagement from "./ReviewsManagement";
import AllReviews from "./AllReviews";


const ReviewLayout = () => {
  const [reviews, isPending, refetch] = useLoader("review", `/review`);
   const [reviewRequest, reviewRequestIsPending, reviewRequestRefetch] = useLoader(
    "reviewRequest",
    `/reviewRequest`
  );
  console.log(reviews);
  const [toggle, setToggle] = useState(false);
    const totalReviews =toggle ? reviewRequest.length: reviews.length;
  const avgRating = (
  ( toggle ? reviewRequest : reviews).reduce((a, b) => a + b.rating, 0) / totalReviews
  ).toFixed(1);
    const pendingReviews = reviewRequest.filter((r) => r.status === "Pending").length;
  const lowRating = reviewRequest.filter((r) => r.rating <= 3.5).length;
  return (
    <div className="mt-10 lg:mt-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        {toggle?<h1 className="text-3xl mb-8 font-bold text-slate-900">
          Reviews Management
        </h1>:
        <h1 className="text-3xl mb-8 font-bold text-slate-900">
          All Reviews
        </h1>}
        <h1 className="text-3xl font-bold text-slate-900">
          Total Reviews : {toggle ? reviewRequest.length:reviews.length}
        </h1>
      </div>

      <div className={`grid grid-cols-2 ${toggle?"md:grid-cols-4":"md:grid-cols-2"} gap-2 lg:gap-6 mb-12`}>
        {(toggle?[
          { label: "Total Reviews", value: totalReviews },
          { label: "Average Rating", value: avgRating !== "NaN"? avgRating : 0 },
          { label: "Pending Reviews", value: pendingReviews },
          { label: "Low Rating Alerts", value: lowRating },
        ]:[
          { label: "Total Reviews", value: totalReviews },
          { label: "Average Rating", value: avgRating !== "NaN"? avgRating : 0 },
          
        ]).map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg"
          >
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="relative flex mb-5 border-b-2 border-gray-300">
  <motion.div
    className="absolute bottom-0 h-[3px] bg-linear-to-r from-[#ff7904] to-[#ff0000] rounded-full"
    initial={false}
    animate={{
      left: toggle ? "50%" : "0%",
      width: "50%",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  />

  <motion.button
    onClick={() => setToggle(false)}
    className={`w-full py-3 font-semibold text-lg transition-colors
      ${
        !toggle
          ? "text-red-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
  >
  All Reviews 
  </motion.button>

  <motion.button
    onClick={() => setToggle(true)}
    className={`w-full py-3 font-semibold text-lg transition-colors
      ${
        toggle
          ? "text-red-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
  >
   Reviews Request
  </motion.button>
</div>
      {toggle ? (
        <ReviewsManagement AllReviewsRefetch={refetch}
        ></ReviewsManagement>
      ) : (
        <AllReviews
          reviews={reviews}
          isPending={isPending}
          refetch={refetch}
        ></AllReviews>
      )}
    </div>
  );
};

export default ReviewLayout;
