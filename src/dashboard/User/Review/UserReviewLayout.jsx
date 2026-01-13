import React, { useState } from "react";
import useLoader from "../../../hooks/useLoader";
import useAuth from "../../../hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import AddReview from "./AddReview";
import MyReview from "./MyReview";

const UserReviewLayout = () => {
  const { user, loading } = useAuth();
  const [toggle, setToggle] = useState(false);

  const [PendingReviews, isPendingPendingReviews, refetchPendingReviews] =
    useLoader(
      "reviewRequest",
      `/reviewRequest?email=${user?.email}`,
      !!user?.email && !loading
    );
  const [ApprovedReviews, isPendingApprovedReviews, refetchApprovedReviews] =
    useLoader(
      "review",
      `/review?email=${user?.email}`,
      !!user?.email && !loading
    );

  return (
    <div>
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
      ${!toggle ? "text-red-600" : "text-gray-600 hover:text-gray-800"}`}
        >
          Add Review
        </motion.button>

        <motion.button
          onClick={() => setToggle(true)}
          className={`w-full py-3 font-semibold text-lg transition-colors
      ${toggle ? "text-red-600" : "text-gray-600 hover:text-gray-800"}`}
        >
          Your Reviews
        </motion.button>
      </div>

      {!toggle ? (
        <AddReview
          refetchPendingReviews={refetchPendingReviews}
          refetchApprovedReviews={refetchApprovedReviews}
        ></AddReview>
      ) : (
        <MyReview
          PendingReviews={PendingReviews}
          ApprovedReviews={ApprovedReviews}
          isPendingPendingReviews={isPendingPendingReviews}
          isPendingApprovedReviews={isPendingApprovedReviews}
          refetchPendingReviews={refetchPendingReviews}
        ></MyReview>
      )}
    </div>
  );
};

export default UserReviewLayout;
