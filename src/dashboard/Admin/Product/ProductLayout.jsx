import  { useState } from "react";
import useLoader from "../../../hooks/useLoader";
import {  motion } from "framer-motion";
import ProductsManagement from "./Products/ProductsManagement";
import CategoriesManagement from "./Categories/CategoriesManagement";
import useScrollToTop from "../../../components/ui/useScrollToTop";

const ProductLayout = () => {
  useScrollToTop();
  const [toggle, setToggle] = useState(false);
  const [products, isPending, refetch] = useLoader("AllProducts", `/foodItem`);
  const [category, categoryIsPending, categoryRefetch] = useLoader(
    "category",
    `/category`
  );
  const totalPages = Math.ceil(products.length / 10);
  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        {toggle?<h1 className="text-3xl mb-8 font-bold text-slate-900">
          Products Management
        </h1>:
        <h1 className="text-3xl mb-8 font-bold text-slate-900">
          Categories Management
        </h1>}
        <h1 className="text-3xl font-bold text-slate-900">
          Total Categories : {toggle ? products.length:category.length}
        </h1>
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
    All Categories
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
    All Products
  </motion.button>
</div>

      {toggle ? (
        <ProductsManagement
          productsData={products}
          totalPage={totalPages}
          refetch={refetch}
        ></ProductsManagement>
      ) : (
        <CategoriesManagement
          categories={category}
          isPending={categoryIsPending}
          refetch={categoryRefetch}
        ></CategoriesManagement>
      )}
    </div>
  );
};

export default ProductLayout;
