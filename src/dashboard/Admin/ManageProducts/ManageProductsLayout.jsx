import { useState } from "react";
import AddProduct from "./Products/AddProduct";
import AddCategory from "./Categories/AddCategory";
import { AnimatePresence, motion } from "framer-motion";


const ManageProductsLayout = () => {
  const [toggle, setToggle] = useState(false);

    return (
       <div className="mt-10 mlg:mt-0">
           
        <header className={`relative mb-10 overflow-hidden rounded-3xl ${toggle?"bg-linear-to-r from-orange-300/20 to-black/1":"bg-linear-to-r from-black/1 to-orange-300/20"} px-3 py-8 lg:p-8 text-white` }>
 
    <div className="flex justify-between">
      <p className="text-sm lg:text-xl uppercase tracking-widest font-medium text-slate-500">
      Manage  Product 
      </p>

      <h1 className="mt-2 text-xl lg:text-3xl font-bold  text-slate-500">
        {toggle ? "Add Category" : "Add Product"}
      </h1>
    </div>
</header>
  



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
    Add Products
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
    Add Categories
  </motion.button>
</div>

      {toggle ? (
        <AddCategory
        ></AddCategory>
      ) : (
       <AddProduct
        ></AddProduct> 
      )}
    </div>
    );
};

export default ManageProductsLayout;