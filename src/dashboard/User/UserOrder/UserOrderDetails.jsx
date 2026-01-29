import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaIdBadge,
  FaMoneyBillWave,
  FaTimes,
  FaTimesCircle,
  FaUtensils,
} from "react-icons/fa";
import { MdOutlineFastfood, MdOutlinePayment } from "react-icons/md";

const UserOrderDetails = ({ selectedOrder, setSelectedOrder }) => {
  if (!selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative  overflow-y-auto md:h-4/6 w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl"
      >
        <button
          onClick={() => setSelectedOrder(null)}
          className="absolute p-1 bg-gray-200 rounded-full top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <FaTimes />
        </button>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Customer: </span>
            {selectedOrder.name}
          </p>
          <p className="text-md">
            <span className="font-semibold">Email: </span> {selectedOrder.email}
          </p>
          <p className="text-md">
            <span className="font-semibold">Phone: </span>
            {selectedOrder.number}
          </p>
           <p className="text-md">
            <span className="font-semibold">Address: </span>
            {selectedOrder.address}
          </p>
   
          <div className="text-gray-700 flex items-center gap-2 text-md">
            <p className=" font-semibold">Items:</p>
            <p className=" flex items-center gap-1">
              <MdOutlineFastfood />
              {selectedOrder.orderedItems.length}
            </p>
          </div>
          <div className="text-gray-700 flex items-center gap-2 text-md">
            <p className=" font-semibold">Date: </p>
            <p className="font-medium">
              {selectedOrder?.date &&
                new Date(selectedOrder.date).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
            </p>
          </div>
          <p className="text-md">
            <span className="font-semibold">Status: </span>
            <span
              className={`px-2 py-0.5 inline-flex items-center gap-1 rounded-full text-xs font-semibold ${
                selectedOrder.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : selectedOrder.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700 animate-pulse"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {selectedOrder.status === "Pending" && <FaClock />}
              {selectedOrder.status === "Completed" && <FaCheckCircle />}
              {selectedOrder.status === "Cancelled" && <FaTimesCircle />}
              {selectedOrder.status}
            </span>
          </p>
          <p className="text-md">
            <span className="font-semibold">Payment Status: </span>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                selectedOrder.paymentStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-800 animate-pulse"
                  : selectedOrder.paymentStatus === "Completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
            {selectedOrder.paymentStatus === "Pending" && <FaClock />}
              {selectedOrder.paymentStatus === "Completed" && <FaCheckCircle />}
              {selectedOrder.paymentStatus === "Failed" && <FaTimesCircle />}
              {selectedOrder.paymentStatus}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-sm mb-2">Dishes</p>
          <ul className="list-disc list-inside grid grid-cols-2 gap-3 text-sm text-gray-600 space-y-1">
            {(selectedOrder.orderedItems || []).map((dish, i) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                <FaUtensils className="text-orange-600 text-[10px]" />
                {dish.name}
                {dish.quantity > 1 && ` x ${dish.quantity}`}
                <span className="font-semibold">(৳{dish.realPrice})</span>
              </span>
            ))}
          </ul>
        </div>

        <div className="mt-5 ">
          <p className="text-base font-semibold text-gray-900">
            Total: ৳{selectedOrder.price}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOrderDetails;
