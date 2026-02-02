import { AnimatePresence, motion } from "framer-motion";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUtensils,
  FaMoneyBillWave,
  FaEye,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useLoader from "../../../hooks/useLoader";
import { Mosaic } from "react-loading-indicators";
import { useState } from "react";
import UserOrderDetails from "./UserOrderDetails";

const statusStyle = {
  Pending: {
    color: "bg-yellow-100 text-yellow-700  animate-pulse",
    icon: <FaClock />,
  },
  Completed: {
    color: "bg-green-100 text-green-700",
    icon: <FaCheckCircle />,
  },
  Cancelled: {
    color: "bg-red-100 text-red-700",
    icon: <FaTimesCircle />,
  },
};

const UserOrders = () => {
  const { user, loading } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, isPending, refetch] = useLoader(
    "savedOrder",
    `/save-order/${user?.email}`,
    !!user?.email && !loading,
  );
  console.log(orders, user.email);
  return (
    <div className="lg:p-6  min-h-screen">
      <div className="mb-6">
        <h2 className="lg:text-3xl text-xl lg:mt-0 lg:ml-0 ml-5 mt-10 font-bold">My Order</h2>
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
              <th>Details</th>
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
            {orders.length === 0 && !isPending ? (
              <tr>
                <td
                  colSpan={100}
                  className="text-center py-20 text-xl font-bold text-gray-500"
                >
                  No order history found!
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={order._id}
                  className="hover"
                >
                  <td>{index + 1}</td>

                  <td>
                    <p className="font-medium">{order.name}</p>
                  </td>
                  <td>{order.number}</td>
                  <td>
                    <span
                      className={`badge border-0 ${
                        order.order === "Paid"
                          ? "bg-indigo-600"
                          : "bg-purple-500"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="font-semibold">
                    ৳
                    {order.orderedItems.reduce(
                      (sum, item) => sum + item.quantity * item.realPrice,
                      0,
                    )}
                  </td>
                  <td>
                    <span
                className={`mt-1 inline-block w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  <td
                    onClick={() => setSelectedOrder(order)}
                    className="text-lg cursor-pointer flex items-center justify-center"
                  >
                    <FaEye className="w-8 h-8 p-2 rounded-xl text-white hover:bg-gray-800 bg-gray-400" />
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

 
      <div className="md:hidden flex flex-col gap-3">
        {orders.length === 0 && !isPending ? (
              <tr>
                <td
                  colSpan={100}
                  className="text-center py-20 text-lg font-bold text-gray-500"
                >
                  No order history found!
                </td>
              </tr>
            ):
          (orders.map((order, idx) => (
          <motion.div
            key={order._id}
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
                {order.orderedItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-1">
              Price: ৳{order.orderedItems.reduce(
                  (sum, item) => sum + item.quantity * item.realPrice,
                  0,
                )}
              </p>
            </div>

            <div className="flex flex-col gap-5 items-center">
              <span
                className={`mt-1 inline-block w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
              <button
                onClick={() => setSelectedOrder(order)}
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 active:scale-95 transition"
              >
                <FaEye className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )))}
      </div>

      <UserOrderDetails
        selectedOrder={selectedOrder}
        setSelectedOrder={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default UserOrders;
