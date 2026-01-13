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
console.log("reviews in all review", reviews);
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
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          toast.success(`This review has been deleted!`);
          refetch();
        }
      }
    });
  };

  return (
    <div>
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

      <div className="space-y-4 grid grid-cols-1 gap-5 mx-10 my-10 md:grid-cols-2 ">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="bg-[#8a8a8a05] border-2 border-[#8a8a8a46] p-5 rounded-lg group relative  backdrop-blur-md shadow-lg"
          >
            <div className="flex gap-1 relative">
              <img className="w-12 h-12 rounded-full" src={review.img} alt="" />
              <div className="flex items-center  ">
                <p className=" font-semibold text-black">{review.name}</p>
                <div className="text-right text-sm absolute right-0 font-semibold text-black">
                  <p>{review.email}</p>
                  <p>{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <p className="w-11/12 text-sm mb-3">{review.description}</p>

              <div className="flex justify-between items-end">
                <div>
                  <p className=" font-semibold text-black mt-2 mb-1">
                    {review.dish}
                  </p>
                  {/* <div className="text-xs text-slate-500">
                    <span className="font-medium">{review.dish}</span> •{" "}
                    <span>{review.type}</span>
                  </div> */}
                </div>
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
                    )
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
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col mt-2 gap-1">
                <p className="text-sm">
                  <span className="font-semibold text-black">Highlights:</span>{" "}
                  {review.pros}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-black">Downsides:</span>{" "}
                  {review.cons}
                </p>
              </div>
              <div className=" px-2 py-0.5 text-xs text-slate-500 rounded-full bg-slate-200">
                <div>
                  {review.recommend ? "Recommended" : "Not Recommended"}
                </div>
              </div>
            </div>
            <button
              className="right-0 bottom-0 absolute 
      opacity-0 translate-y-2
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-300 hover:bg-red-400
      bg-red-500 text-white text-base
     w-full flex items-center rounded-bl-lg  border-2 border-[#8a8a8a46] rounded-br-lg justify-center gap-2 py-2"
              onClick={() => handleDeleteReview(review._id)}
            >
              <FaTrash />
              Delete
            </button>
          </motion.div>
        ))}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AllReview;
