import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full h-[90vh] max-w-4xl bg-white rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
      >
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#f2f2f2] hover:bg-[#d8d8d8] transition"
        >
          <FaTimes className="text-gray-700" />
        </button>

        
        <div className="relative h-[380px] w-full">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-4xl font-extrabold tracking-tight">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-white/80">
              {product.type} 
            </p>
          </div>
        </div>

        
        <div className="p-8 grid grid-cols-4 gap-6">
          {[
            ["Price", `৳${product.realPrice}`],
            ["Rating", product.rating ? product.rating + "/5" + " (20 reviews)" : 0],
            ["Category", product.type],
            // ["Rating", product.rating],
            ["CookingTime", product.cookingTime + " min"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-100 bg-gray-50 pl-4 py-3"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {label}
              </p>
              <p className="mt-2 ml-1 text-sm font-semibold text-gray-900 leading-snug">
                {value}
              </p>
            </div>
          ))}
          
        </div>
        <div className="rounded-2xl border w-2/3  border-gray-100 bg-gray-50 ml-8 px-4 py-3">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Ingredients
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 leading-snug">
              {product.ingredients}
            </p>
          </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
