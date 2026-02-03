import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaThumbsUp, FaThumbsDown, FaStarHalf } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useLoader from "../../../hooks/useLoader";
import img1 from "/assets/logo/logo.png";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsPersonCircle } from "react-icons/bs";

const AddReview = ({ refetchPendingReviews, refetchApprovedReviews }) => {
  const { user, loading } = useAuth();
  const [orders, ,] = useLoader(
    "paymentsHistory",
    `/paymentHistory?email=${user?.email}`,
    !!user?.email && !loading,
  );

  const axiosSecure = useAxiosSecure();
  // console.log([
  //   ...new Set(
  //     orders
  //       .map((order) =>
  //         order.orderedItems.map((item) => `${item.name}-${item.type}`)
  //       )
  //       .flat()
  //   ),
  // ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  console.log("selectedItems", selectedItems);

  const onSubmit = async (data) => {
    if(selectedItems.length === 0){
      toast.error("Please select at least one item!");
      return;
    }
    const newReview = {
      img: user.photoURL
        ? user.photoURL
        : "https://i.ibb.co.com/NYF9QTQ/images.png",
      name: user?.displayName,
      email: user?.email,
      date: new Date().toISOString(),
      dish: selectedItems,
      description: data.description,
      rating: Number(rating),
      pros: data.pros,
      cons: data.cons,
      recommend: data.recommend === "true" ? true : false,
      status: "Pending",
    };
    console.log(newReview);
    await axiosSecure.post("/reviewRequest", newReview).then((res) => {
      if (res.data.insertedId) {
        toast.success(
          "Review submitted successfully and waiting for Approval!",
        );
        reset();
        setSelectedItems([]);
        setRating(0);
        refetchPendingReviews();
        refetchApprovedReviews();
      }
    });
  };
  const uniqueItems = [
    ...new Map(
      orders.map((order) =>
        order.orderedItems.map((item) => [item.foodId, item.name]),
      ),
    ).values(),
  ];
  // console.log("uniqueItems", uniqueItems);

  return (
    <div className="min-h-screen bg-slate-50 md:px-4 py-5 md:py-10">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Add Your Review
        </h2>

        <div className="flex flex-col gap-2">
          
          <label className="font-semibold text-gray-700">
            
            Choose Items to Review You Ordered:
          </label>
          <div className="flex flex-wrap gap-3 overflow-x-auto py-2 w-full h-30">
            
            {[
              ...new Set(
                orders.flatMap((order) =>
                  order.orderedItems.map((item) => item.name),
                ),
              ),
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setSelectedItems(item)}
                className={`px-4 py-2 rounded-xl border ${selectedItems.includes(item) ? "bg-gray-400 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-700"} transition-colors hover:bg-gray-300 hover:text-white`}
              >
                
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Rating</label>

          <div className="flex flex-wrap items-center gap-4">
            <input
              type="number"
              max={5}
              min={1}
              step={0.1}
              {...register("rating", { required: true, min: 1, max: 5 })}
              className="w-24 rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              onChange={(e) => {
                let value = e.target.value;
                if (value > 5) value = 5;
                if (value < 1) value = 1;
                setRating(value);
              }}
            />

            <div className="flex items-center gap-1">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <FaStar key={i} className="text-2xl text-amber-400" />
              ))}
              {rating % 1 !== 0 && (
                <FaStarHalf className="text-2xl text-amber-400" />
              )}
              {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                <FaStar key={i} className="text-2xl text-slate-300" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">
            Review Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Share your experience in detail..."
            className="h-32 resize-none rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-emerald-600">
              <FaThumbsUp /> Pros
            </label>
            <input
              {...register("pros", { required: true })}
              placeholder="What you liked"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-semibold text-rose-600">
              <FaThumbsDown /> Cons
            </label>
            <input
              {...register("cons", { required: true })}
              placeholder="What you didn’t like"
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="font-semibold text-slate-700">
            Do you recommend this?
          </label>
          <select
            {...register("recommend", { required: true })}
            className="rounded-xl border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-4 rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 py-3 font-semibold text-white shadow-lg hover:shadow-xl"
        >
          Submit Review
        </motion.button>
      </motion.form>

      <Toaster position="top-right" />
    </div>
  );
};

export default AddReview;
