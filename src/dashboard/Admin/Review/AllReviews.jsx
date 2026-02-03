import { FaStar, FaStarHalf, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Mosaic } from "react-loading-indicators";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const AllReview = ({ reviews = [], isPending, refetch }) => {
  const axiosSecure = useAxiosSecure();

  if (reviews.length === 0 && !isPending) {
    return (
      <div className="py-24 text-center text-slate-400">No reviews found</div>
    );
  }
// console.log("reviews in all review", reviews);
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
        const res = await axiosSecure.delete(`/review/${id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          toast.success(`This review has been deleted!`);
          refetch();
        }
      }
    });
  };

  return (
   <div className="min-h-screen bg-slate-100 px-4 sm:px-8 py-16">

  {isPending && (
    <div className="flex justify-center mb-12">
      <div className="scale-[0.75]">
        <Mosaic
          size="small"
          color={[
            "#0f172a",
            "#334155",
            "#475569",
            "#64748b",
            "#1e293b",
          ]}
        />
      </div>
    </div>
  )}

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

    {reviews.map((review, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="
          group relative rounded-2xl border border-slate-200
          bg-white/70 backdrop-blur-md shadow-lg
          p-6 hover:shadow-xl transition
        "
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <img
              src={review.img}
              alt=""
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="font-semibold text-slate-800">
                {review.name}
              </p>
              <p className="text-xs text-slate-500">
                {review.email}
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            {new Date(review.date).toLocaleDateString()}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          {review.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-semibold text-slate-800">
              {review.dish}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(Math.floor(review.rating))].map((_, i) => (
              <FaStar key={i} className="text-amber-400 text-sm" />
            ))}
            {[...Array(Math.ceil(review.rating) - Math.floor(review.rating))].map(
              (_, i) => (
                <FaStarHalf key={i} className="text-amber-400 text-sm" />
              )
            )}
            {[...Array(5 - Math.ceil(review.rating))].map((_, i) => (
              <FaStar key={i} className="text-slate-300 text-sm" />
            ))}
            <span className="ml-2 text-xs text-slate-500">
              {review.rating}/5
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-slate-800">
              Highlights:
            </span>{" "}
            {review.pros}
          </p>
          <p>
            <span className="font-semibold text-slate-800">
              Downsides:
            </span>{" "}
            {review.cons}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              review.recommend
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {review.recommend ? "Recommended" : "Not Recommended"}
          </span>
        </div>

     <button
  onClick={() => handleDeleteReview(review._id)}
  className="
    absolute bottom-0 left-0 w-full
    lg:flex items-center justify-center gap-2
    py-2 text-sm font-semibold
    bg-rose-500 text-white
    rounded-b-2xl
    transition-all duration-300
    opacity-0 translate-y-3  hidden
    group-hover:opacity-100 group-hover:translate-y-0
  "
>
  <FaTrash />
  Delete Review
</button>

     <button
  onClick={() => handleDeleteReview(review._id)}
  className=" lg:hidden
    absolute -top-2 -right-3 w-1/11
    flex items-center justify-center gap-2
    py-2 text-sm font-semibold
    bg-rose-500 text-white
    rounded-full
    transition-all duration-300
    
  "
>
  <FaTrash />
</button>

      </motion.div>
    ))}
  </div>

  <Toaster position="top-right" />
</div>

  );
};

export default AllReview;
