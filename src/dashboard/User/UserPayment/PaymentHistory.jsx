import { useState } from "react";
import PaymentDetails from "./PaymentDetails";
import useLoader from "../../../hooks/useLoader";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineSelect } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { Mosaic } from "react-loading-indicators";
import Swal from "sweetalert2";
import useScrollToTop from "../../../components/ui/useScrollToTop";
import useAuth from "../../../hooks/useAuth";

const PaymentsHistory = () => {
  useScrollToTop();
  const { user, loading } = useAuth();
  const [payments, isPending, refetch] = useLoader(
    "paymentsHistory",
    `/paymentHistory?email=${user?.email}`,!!user?.email && !loading
  );
  // console.log(payments);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [selectedOption, setSelectedOption] = useState(false);
  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const totalRevenue = payments.reduce((grandTotal, order) => {
    const orderTotal = order.orderedItems.reduce((sum, item) => {
      return sum + item.quantity * Number(item.realPrice);
    }, 0);

    return grandTotal + orderTotal;
  }, 0);
  // console.log(selectedIds);

  // console.log("totalItemsPrice", totalRevenue);
  const handleSelectedDeletedPayments = async () => {
    Swal.fire({
      title: "Are You Certain You Want To Deleted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .delete(`/paymentHistory`, { data: { ids: selectedIds } })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success("All selected payments has been Deleted!");
              setSelectedIds([]);
              refetch();
            }
          })
          .catch((error) => {
            if (error.status === 404) {
              toast.error(error.response.data.message);
            }
          });
      }
    });
  };
  return (
    <div className="lg:p-6  min-h-screen">
      <div className="mb-6">
        <h2 className="lg:text-3xl text-xl lg:mt-0 mt-10  lg:ml-0 ml-5 font-bold">My Payment History</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-linear-to-r from-green-400 to-emerald-500 text-white"
        >
          <h4 className="text-sm opacity-80">Total Spent</h4>
          <p className="text-2xl font-bold">৳ {totalRevenue}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-linear-to-r from-blue-400 to-cyan-500 text-white"
        >
          <h4 className="text-sm opacity-80">Total Ordered</h4>
          <p className="text-2xl font-bold">{payments.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl hidden md:block bg-linear-to-r from-purple-500 to-indigo-600 text-white"
        >
          <h4 className="text-sm opacity-80">Payment Methods</h4>
          <p className="text-2xl font-bold">Stripe / COD</p>
        </motion.div>
      </div>
      <div className="flex justify-end gap-2">
        {selectedOption && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectedDeletedPayments()}
            className="bg-linear-to-r from-[#fe0000] to-[#ff3c3ce4] flex gap-2 items-center  text-white px-3 py-2 mb-5 font-semibold text-sm rounded-xl"
          >
            <FaRegTrashAlt /> Delete selected
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedOption(!selectedOption)}
          className="bg-linear-to-r from-[#fe0000] to-[#ff3c3ce4] flex gap-2 items-center  text-white px-3 py-2 mb-5 font-semibold text-sm rounded-xl"
        >
          <AiOutlineSelect /> select option
        </motion.button>
      </div>

      <div className="hidden md:block  overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="table w-full pb-5">
          <thead className="bg-gray-100 text-gray-700 ">
            <tr>
              <th>#</th>
              
              <th>Customer</th>
              <th>Contact</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              {selectedOption ? <th>Select</th> : <th>Details</th>}
            </tr>
          </thead>

          <tbody>
            {isPending && (
              <tr>
                <td colSpan={100} className="text-center py-20">
                  <div className="flex justify-center">
                    <div className="inline-block scale-[0.7]">
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
                </td>
              </tr>
            )}
            {payments.length === 0 && !isPending ? (
              <tr>
                <td
                  colSpan={100}
                  className="text-center py-20 text-xl font-bold text-gray-500"
                >
                  No payment history found!
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={payment._id}
                  className="hover"
                >
                  <td>{index + 1}</td>

                 
                  <td>
                    <p className="font-medium">{payment.name}</p>
                    <p className="text-xs text-gray-500">{payment.email}</p>
                  </td>
                  <td>{payment.number}</td>
                  <td>
                    <span
                      className={`badge border-0 ${
                        payment.payment === "Paid"
                          ? "bg-indigo-600"
                          : "bg-purple-500"
                      }`}
                    >
                      {payment.payment === "Paid" ? "Stripe" : "COD"}
                    </span>
                  </td>
                  <td className="font-semibold">
                    ৳{" "}
                    {payment.orderedItems.reduce(
                      (sum, item) => sum + item.quantity * item.realPrice,
                      0
                    )}
                   
                  </td>
                  <td>
                    <span className="badge text-white font-medium badge-success">
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  {selectedOption ? (
                    <td className="text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(payment._id)}
                          onChange={() => toggleSelect(payment._id)}
                          className="checkbox border-red-600 border-2 bg-white checked:border-orange-500 checked:bg-red-600 "
                        />
                      </label>
                    </td>
                  ) : (
                    <td
                      onClick={() => setSelectedPayment(payment)}
                      className="text-lg cursor-pointer flex items-center justify-center"
                    >
                      <FaEye className="w-8 h-8 p-2 rounded-xl text-white hover:bg-gray-800 bg-gray-400" />
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

<div className="md:hidden flex flex-col gap-3">
       {payments.length === 0 && !isPending ? (
             
                <div
                  colSpan={100}
                  className="text-center py-20 text-lg font-bold text-gray-500"
                >
                  No payment history found!
                </div>
             
            ): (payments.map((payment, idx) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between"
          >
      
            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-900 leading-tight">
                #100{idx + 1}
              </p>

              <p className="text-sm font-medium text-gray-700 mt-1">
                Items:{" "} 
                {payment.orderedItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
              Price: ৳{payment.orderedItems.reduce(
                  (sum, item) => sum + item.quantity * item.realPrice,
                  0,
                )}
              </p>
            </div>

            <div className="flex flex-col gap-5 items-center">
              <span
                className={`mt-1 inline-block w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  payment.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {payment.status}
              </span>
              {selectedOption ? (
                    <div className="text-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(payment._id)}
                          onChange={() => toggleSelect(payment._id)}
                          className="checkbox border-red-600 border-2 bg-white checked:border-orange-500 checked:bg-red-600 "
                        />
                      </label>
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelectedPayment(payment)}
                      className="text-lg cursor-pointer flex items-center justify-center"
                    >
                      <FaEye className="w-8 h-8 p-2 rounded-xl text-white hover:bg-gray-800 bg-gray-400" />
                    </div>
                  )}
            </div>
          </motion.div>
        )))}
      </div>


      <PaymentDetails
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default PaymentsHistory;
