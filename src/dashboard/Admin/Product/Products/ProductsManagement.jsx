import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ProductModal from "./ProductModal";
import Swal from "sweetalert2";
import ProductEdit from "./ProductEdit";
import toast, { Toaster } from "react-hot-toast";
import { Mosaic } from "react-loading-indicators";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useLoader from "../../../../hooks/useLoader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useScrollToTop from "../../../../components/ui/useScrollToTop";

const ProductsManagement = () => {
  useScrollToTop();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [menuSection, setMenuSection] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  const axiosSecure = useAxiosSecure();

  const [category, categoryIsPending, categoryRefetch] = useLoader(
    "category",
    `/category`
  );
  const [{ allItems: products = [], totalPage }, isPending, refetch] =
    useLoader(
      "AllProducts",
      `/foodItem?page=${page}&limit=${limit}&type=${filter}&menuSection=${menuSection}&search=${search}`
    );

  // console.log(products, totalPage);

  useEffect(() => {
    if (totalPages !== totalPage && products.length > 0) {
      setTotalPages(totalPage);
    }
  }, [totalPage, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are You Certain You Want To Deleted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/foodItemId/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Item has been successfully Deleted!");
            refetch();
          }
        });
      }
    });
  };

  const handleUpdateFood = async (data) => {
    //  return console.log(data.id1);
    const res = await axiosSecure.patch(`/foodItemId/${data.id1}`, data);
    if (res.data.matchedCount) {
      toast.success("Item has been successfully Updated!");
      refetch();
      setSelectedProductEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Product ID or Name"
            className="w-full rounded-xl border border-gray-300 px-10 py-2 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>

        <div className=" flex justify-center ">
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-md">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-2 py-2  font-semibold rounded-full
        bg-gray-100 hover:bg-gray-200
        disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IoIosArrowBack />
            </button>

            {[page - 1, page, page + 1]
              .filter((p) => p > 0 && p <= totalPages)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center
            rounded-full text-xs font-bold transition-all
            ${
              page === p
                ? "bg-linear-to-r from-[#ff7904] to-[#ff0000] text-white shadow scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
                >
                  {p}
                </button>
              ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-2 py-2  font-semibold rounded-full
        bg-gray-100 hover:bg-gray-200
        disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <select
          value={menuSection}
          onChange={(e) => setMenuSection(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Products</option>
          <option value="Regular">Regular Dish</option>
          <option value="TopFood">Top Food</option>
          <option value="SpecialOffer">Special Offer</option>
          <option value="Popular">Popular</option>
          <option  value="BestSellers">
                    Best Sellers
                  </option>
        </select>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Category</option>
          {category.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.05, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl bg-white/50 backdrop-blur-md border border-gray-200 p-5 shadow hover:shadow-2xl transition"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />

            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-900">{product.name}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status ? product.status : "Out of ingredients"}
              </span>
            </div>

            <div className="grid grid-cols-2 text-sm mb-4 gap-y-2">
              <div>
                <p className="text-gray-400 text-xs">Category</p>
                <p className="font-medium">{product.type}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Price</p>
                <p className="font-semibold text-gray-900">
                  ৳{product.realPrice}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Added</p>
                <p className="font-medium">
                  {new Date(product.added_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs"> Menu Section</p>
                <p className="font-medium">{product.menuSection}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => setSelectedProduct(product)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-2 text-sm hover:bg-slate-800 transition"
              >
                <FaEye /> View
              </button>
              <button
                onClick={() => setSelectedProductEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-orange-400 text-orange-600 py-2 text-sm hover:bg-orange-50 transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-400 text-red-600 py-2 text-sm hover:bg-red-50 transition"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProductEdit && (
        <ProductEdit
          product={selectedProductEdit}
          categories={category}
          onClose={() => setSelectedProductEdit(false)}
          onUpdate={handleUpdateFood}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ProductsManagement;
