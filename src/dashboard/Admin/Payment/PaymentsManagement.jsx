import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSearch,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
  FaMoneyBill,
  FaRegTrashAlt,
  FaClock,
} from "react-icons/fa";
import PaymentModal from "./PaymentModal"; // Import modal component
import useLoader from "../../../hooks/useLoader";
import PaymentDetailsModal from "./PaymentDetailsModal";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Mosaic } from "react-loading-indicators";
import useScrollToTop from "../../../components/ui/useScrollToTop";

const PaymentsManagement = () => {
  useScrollToTop();
  const [payments, isPending, refetch] = useLoader("savedOrder", `/save-order`);
  console.log(payments);
  const [option, setOption] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [updateStatus, setUpdateStatus] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null); // For modal
  const axiosSecure = useAxiosSecure();

  const filteredPayments = payments.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p._id?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : p.paymentStatus === filter;
    return matchSearch && matchFilter;
  });

  const totalPayments = payments.length;
  const pendingPayments = payments.filter((p) => p.status === "Pending").length;
  const failedPayments = payments.filter((p) => p.status === "Failed").length;
  const completedPayments = payments.filter(
    (p) => p.status === "Completed"
  ).length;

  const handleUpdateStatus = async (orderId, newStatus) => {
    console.log(orderId, newStatus);
    const res = await axiosSecure.patch(
      `/save-order/paymentStatus/${orderId}`,
      { newStatus }
    );
    if (res.data.matchedCount) {
      toast.success(`order has been successfully updated to ${newStatus}!`);
      refetch();
      setUpdateStatus(null);
    }
  };

  const handleAllItemDeleted = async(paymentStatus) => {
    console.log(paymentStatus);
   await axiosSecure
      .delete(`/completeOrder`, { data: { paymentStatus } })
      .then((res) => {
        // console.log(res.data);
        if (
          res.data.deleteOrder.deletedCount > 0 &&
          res.data.paymentHistory.insertedCount > 0
        ) {
          toast.success("All Item has been successfully Deleted!");
          toast.success("Orders moved to Payment History");
          refetch();
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Payments Management
        </h1>
      </div>

   
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Payments", value: totalPayments },
          { label: "Pending", value: pendingPayments },
          { label: "Completed", value: completedPayments },
          { label: "Failed", value: failedPayments },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative  w-2/5">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Payment ID or Customer"
            className="w-full rounded-xl border border-gray-300 px-10 py-2 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Payments</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
        {payments.length === 0 ? (
          <button className="bg-gray-500 text-gray-300 cursor-not-allowed opacity-50 -top-8 left-96 px-3 py-2 font-semibold text-sm  rounded-xl flex gap-2 items-center">
            <FaRegTrashAlt /> Delete All Payments
          </button>
        ) : (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOption(!option)}
              className="bg-linear-to-r from-[#fe0000] to-[#ff3c3ce4] flex gap-2 items-center  text-white px-3 py-2 font-semibold text-sm rounded-xl"
            >
              <FaRegTrashAlt /> Delete All Payments
            </motion.button>
            <AnimatePresence>
              {option && (
                <motion.div
                  initial={{ opacity: 0, scale: 1, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  exit={{
                    opacity: 0,
                    scale: 1,
                    y: -60,
                    transition: { duration: 0.7, delay: 0.01, ease: "easeIn" },
                  }}
                  className="flex absolute bg-[#ffffff] p-3 border-[#ff000023] rounded-xl border-2  top-13 z-30 -left-43 gap-2 items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAllItemDeleted("Completed")}
                    className="bg-linear-to-r from-[#fe0000] to-[#ff3c3ce4] flex gap-2 items-center  text-white px-3 py-3 font-semibold text-sm rounded-xl"
                  >
                    <FaRegTrashAlt /> Delete Completed
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAllItemDeleted("Failed")}
                    className="bg-linear-to-r from-[#fe0000] to-[#ff3c3ce4] flex gap-2 items-center  text-white px-3 py-3 font-semibold text-sm rounded-xl"
                  >
                    <FaRegTrashAlt /> Delete Failed
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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

      
       { payments.length === 0 && !isPending &&(<div className="flex flex-col items-center justify-center h-80 text-center">
      <h2 className="text-xl font-bold text-gray-600">
        No Orders Available
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        You don’t have any orders yet or all orders are completed.
      </p>
    </div>)}
      

      {/* Payments Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPayments.map((payment, index) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative rounded-2xl bg-white/50 backdrop-blur-md border border-gray-200 p-5 shadow hover:shadow-2xl transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-600 text-xs">
                  ##{payment._id}
                </p>
                <div>
                  <p className="text-xs text-gray-500">{payment.email}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                  payment.paymentStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-800 animate-pulse"
                    : payment.paymentStatus === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {payment.paymentStatus === "Pending" && <FaClock />}
                {payment.paymentStatus === "Completed" && <FaCheckCircle />}
                {payment.paymentStatus === "Failed" && <FaTimesCircle />}
                {payment.paymentStatus}
              </span>
            </div>

        
            <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="font-medium ">{payment.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Amount</p>
                <p className="font-semibold text-gray-900">৳{payment.price}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Payment Method</p>
                <p className="font-medium">{payment.payment}</p>
              </div>

              <div>
                <p className="text-slate-400 text-xs">Date</p>
                <p className="font-medium">
                  {payment?.date &&
                    new Date(payment.date).toLocaleString("en-BD", {
                      // dateStyle: "medium",
                      timeStyle: "short",
                    })}
                </p>
                <p className="font-medium">
                  {payment?.date &&
                    new Date(payment.date).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      // timeStyle: "short",
                    })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <p className="text-gray-400 text-xs">Item status:</p>
              <p
                className={`inline-flex items-center gap-1  text-xs font-semibold rounded-full ${
                  payment.status === "Pending"
                    ? " text-yellow-800 animate-pulse"
                    : payment.status === "Completed"
                    ? " text-green-800"
                    : " text-red-800"
                }`}
              >
                {payment.status === "Completed" && <FaCheckCircle />}
                {payment.status === "Cancelled" && <FaTimesCircle />}
                {payment.status}
              </p>
            </div>
           
            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => setSelectedPayment(payment)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-2 text-sm hover:bg-slate-800 transition"
              >
                View Details
              </button>
              <button
                onClick={() => setUpdateStatus(payment)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-orange-400 text-orange-600 py-2 text-sm hover:bg-orange-50 transition"
              >
                Update Status
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <PaymentDetailsModal
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />

  

      <PaymentModal
        payment={updateStatus}
        onClose={() => setUpdateStatus(null)}
        handleUpdateStatus={handleUpdateStatus}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PaymentsManagement;
