import { motion } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
  FaMoneyBill,
} from "react-icons/fa";

const PaymentModal = ({ payment, onClose, handleUpdateStatus }) => {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-1/2 p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-lg font-bold text-gray-400 mb-4">
          ##{payment._id}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="text-gray-400">Customer</p>
            <p className="font-medium">{payment.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="font-medium">{payment.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Amount</p>
            <p className="font-semibold text-gray-900">৳{payment.price}</p>
          </div>
          <div>
            <p className="text-gray-400">Payment Method</p>
            <p className="font-medium flex items-center gap-1">
              {payment.payment === "Paid" ? (
                <FaCreditCard className="text-blue-600" />
              ) : (
                <FaMoneyBill className="text-green-600" />
              )}
              {payment.payment}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Date</p>
            <p className="font-medium">
              {payment?.date &&
                new Date(payment.date).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Status</p>
            <p className="font-medium">{payment.status}</p>
          </div>
        </div>

    
        <div className="flex gap-3">
          <button
            onClick={() => handleUpdateStatus(payment._id, "Completed")}
            className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <FaCheckCircle /> Mark Completed
          </button>
          <button
            onClick={() => handleUpdateStatus(payment._id, "Pending")}
            className="flex-1 bg-yellow-200 text-yellow-800 py-2 rounded-xl hover:bg-yellow-300 transition flex items-center justify-center gap-2"
          >
            <FaCheckCircle /> Mark Pending
          </button>
          <button
            onClick={() => handleUpdateStatus(payment._id, "Failed")}
            className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <FaTimesCircle /> Mark Failed
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
