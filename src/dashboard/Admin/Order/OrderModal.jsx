import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { FaIdBadge, FaTimes } from "react-icons/fa";


const OrderModal = ({ isStatus ,setIsStatus, updateStatus}) => {
  if (!isStatus) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={() => setIsStatus(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-5 text-center">
          Update Order Status
        </h2>

        <p className="text-md text-gray-500 text-center mb-2 break-all flex items-center gap-1 justify-center">
            <span className="font-semibold text-gray-700">
          Order ID: </span> <FaIdBadge className="text-gray-400" /> {isStatus._id}
        </p>

                        <p className="font-medium flex justify-center items-center gap-1 mb-6">
                          <CgProfile /> {isStatus.name}
                        </p>
                   

        {/* Status Buttons */}
        <div className="space-x-3 flex">
          {["Pending", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => updateStatus(isStatus._id, status)}
              className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition ${
                status === "Pending"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : status === "Completed"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderModal;
