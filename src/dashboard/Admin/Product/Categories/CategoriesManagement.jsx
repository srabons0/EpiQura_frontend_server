import { motion } from "framer-motion";
import { useState } from "react";
import { FaEdit, FaTrash, FaUtensils } from "react-icons/fa";
import { Mosaic } from "react-loading-indicators";
import CategoryEdit from "./CategoryEdit";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import useScrollToTop from "../../../../components/ui/useScrollToTop";

const CategoriesManagement = ({ categories, isPending, refetch }) => {
  useScrollToTop();
  console.log(categories);
  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (id) => {
    //  return console.log(id);
    Swal.fire({
      title: "Are You Certain You Want To Deleted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/category/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Item has been successfully Deleted!");
            refetch();
          }
        });
      }
    });
  };


    const handleUpdateCategory = async (data) => {
    //  return console.log(data.id1);
    const res = await axiosSecure.patch(`/category/${data.id1}`, data);
    if (res.data.matchedCount) {
      toast.success("Item has been successfully Updated!");
      refetch();
      setSelectedCategoryEdit(false);
    }
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 md:px-8 py-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="
              flex flex-col justify-center items-center  rounded-2xl border border-slate-200
              bg-white/60 p-3
            "
          >
     

            <img
              src={category.img}
              alt={category.name}
              className="rounded-full w-20 h-20 object-cover  mb-4"
            />

            <h3 className="font-semibold text-slate-900 text-lg">
              {category.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Food category</p>

            <div className="flex justify-center items-center gap-2 w-full mt-2">
              <button
                onClick={() => setSelectedCategoryEdit(category)}
                className=" flex items-center justify-center gap-2 rounded-xl border border-orange-400 text-orange-600 py-2 px-4 text-sm hover:bg-orange-50 transition"
              >
                <FaEdit /> Edit
              </button>
               
              <button  onClick={() => handleDelete(category._id)} className="flex items-center justify-center rounded-lg border border-red-300 text-red-600 py-2 px-4 hover:bg-red-50">
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedCategoryEdit && (
        <CategoryEdit
          category={selectedCategoryEdit}
          onClose={() => setSelectedCategoryEdit(false)}
          onUpdate={handleUpdateCategory}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default CategoriesManagement;
