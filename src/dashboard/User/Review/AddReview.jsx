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

// Example previous reviews (could come from API)
// const initialReviews = [
//   {
//     id: "r1",
//     items: ["1", "2"],
//     rating: 5,
//     title: "Amazing dishes!",
//     description: "Loved both Chicken Alfredo and BLT. Fresh and tasty!",
//     pros: "Fresh ingredients, good portion",
//     cons: "None",
//     recommend: true,
//     date: "2025-12-17",
//   },
// ];

const AddReview = ({ refetchPendingReviews, refetchApprovedReviews }) => {
  const { user, loading } = useAuth();
  const [orders, ,] = useLoader(
    "paymentsHistory",
    `/paymentHistory?email=${user?.email}`,
    !!user?.email && !loading
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
          "Review submitted successfully and waiting for Approval!"
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
        order.orderedItems.map((item) => [item.foodId, item.name])
      )
    ).values(),
  ];
  // console.log("uniqueItems", uniqueItems);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-10">
      {/* Add Review Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl flex flex-col gap-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-gray-800">Add Your Review</h2>

        {/* Select Items */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Choose Items to Review You Ordered:
          </label>
          <div className="flex flex-wrap gap-3 overflow-x-auto py-2 w-full h-30">
            {[
              ...new Set(
                orders.flatMap((order) =>
                  order.orderedItems.map((item) => item.name)
                )
              ),
            ].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setSelectedItems(item)}
                className={`px-4 py-2 rounded-xl border ${
                  selectedItems.includes(item)
                    ? "bg-gray-400 border-gray-500 text-white"
                    : "bg-white border-gray-300 text-gray-700"
                } transition-colors hover:bg-gray-300 hover:text-white`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Rating:</label>
          <div className="flex items-center gap-5">
            <input
              type="number"
              max={5}
              min={1}
              step={0.1}
              {...register("rating", { required: true, min: 1, max: 5 })}
              className="input w-20 border border-gray-300 bg-white"
              onChange={(e) => {
                let value = e.target.value;
                if (value > 5) value = 5;
                if (value < 1) value = 1;
                setRating(value);
              }}
              name="rating"
              id="rating"
            />

            {[...Array(Math.floor(rating))].map((star, i) => (
              <motion.button
                key={star}
                className={`text-3xl transition-colors ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <FaStar />
              </motion.button>
            ))}
            {[...Array(Math.ceil(rating) - Math.floor(rating))].map(
              (star, i) => (
                <FaStarHalf
                  key={i}
                  className="text-3xl transition-colors  text-amber-400"
                />
              )
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">
            Review Description:
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write detailed review..."
            className="resize-none p-3 h-32 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-green-600 flex items-center gap-1">
              <FaThumbsUp /> Pros
            </label>
            <input
              type="text"
              {...register("pros", { required: true })}
              placeholder="What you liked"
              className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-red-600 flex items-center gap-1">
              <FaThumbsDown /> Cons
            </label>
            <input
              type="text"
              {...register("cons", { required: true })}
              placeholder="What you didn't like"
              className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700">
            Do you recommend this?
          </label>
          <select
            {...register("recommend", { required: true })}
            className="p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg mt-4 hover:shadow-xl"
        >
          Submit Review
        </motion.button>
      </motion.form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddReview;
