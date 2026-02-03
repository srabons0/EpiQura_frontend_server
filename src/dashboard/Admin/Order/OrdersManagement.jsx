import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaUtensils,
  FaIdBadge,
} from "react-icons/fa";
import OrderModal from "./OrderModal";
import OrderDetailsModal from "./OrderDetailsModal";
import useLoader from "../../../hooks/useLoader";
import {
  MdDeliveryDining,
  MdOutlinePayment,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Mosaic } from "react-loading-indicators";
import useScrollToTop from "../../../components/ui/useScrollToTop";


const OrdersManagement = () => {
  useScrollToTop();
  const [orders, isPending, refetch] = useLoader("savedOrder", `/save-order`);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isStatus, setIsStatus] = useState(null);
  const axiosSecure = useAxiosSecure();
// console.log(orders);
  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.name?.toLowerCase().includes(search.toLowerCase()) ||
      order._id?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : order.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = async(orderId, newStatus) => {
    // console.log(orderId, newStatus);
const res = await axiosSecure.patch(`/save-order/${orderId}`, {newStatus});
    if (res.data.matchedCount) {
      toast.success(`order has been successfully updated to ${newStatus}!`);
      refetch();
      setIsStatus(null)
    }
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 px-4 md:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Orders Management
        </h1>
      </div>

     
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Orders", value: orders.length },
          {
            label: "Pending",
            value: orders.filter((o) => o.status === "Pending").length,
          },
          {
            label: "Completed",
            value: orders.filter((o) => o.status === "Completed").length,
          },
          {
            label: "Cancelled",
            value: orders.filter((o) => o.status === "Cancelled").length,
          },
          
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-white/30 backdrop-blur-lg border border-slate-200 px-5 py-4 shadow-lg hover:shadow-2xl transition"
          >
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="w-full rounded-xl border border-slate-200 px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

{
isPending && <div className="mt-20 flex justify-center">
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
}

{ orders.length === 0 && !isPending &&(<div className="flex flex-col items-center justify-center h-80 text-center">
      <h2 className="text-xl font-bold text-gray-600">
        No Orders Available
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        You don’t have any orders yet or all orders are completed.
      </p>
    </div>)}

    
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative rounded-3xl bg-white/40 backdrop-blur-lg border border-slate-200 p-3 lg:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
           
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-semibold flex items-center gap-1 text-slate-900 mb-2">
                  <MdDeliveryDining className="w-6 h-6" /> Order- #100{index + 1}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <FaIdBadge className="text-gray-400" /> {order._id}
                </p>

              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 lg:px-3 py-1 text-xs font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 animate-pulse"
                    : order.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status === "Pending" && <FaClock />}
                {order.status === "Completed" && <FaCheckCircle />}
                {order.status === "Cancelled" && <FaTimesCircle />}
                {order.status}
              </span>
            </div>

           
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs">Customer</p>
                <p className="font-medium flex items-center gap-1">
                  <CgProfile /> {order.name}
                </p>
              </div>
             <div>
                <p className="text-slate-400 text-xs">Payment</p>
                {order.payment === "Cash" ? (
                  <p className="font-medium flex items-center gap-1">
                    <FaMoneyBillWave />
                    {order.payment}
                  </p>
                ) : (
                  <p className="font-medium flex items-center gap-1">
                    <MdOutlinePayment /> {order.payment}
                  </p>
                )}
              </div> 
              <div className=" overflow-y-auto h-20">
                <p className="text-slate-400 text-xs">Dishes</p>
                <div className="flex flex-wrap mt-2 gap-1">
                  {(order.orderedItems || []).map((dish, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <FaUtensils className="text-orange-600 text-[10px]" />
                      {dish.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-slate-400 text-xs">Date</p>
               <p className="font-medium">
                  {order?.date &&
                    new Date(order.date).toLocaleString("en-BD", {
                      // dateStyle: "medium",
                      timeStyle: "short",
                    })}
                </p> 
                <p className="font-medium">
                  {order?.date &&
                    new Date(order.date).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      // timeStyle: "short",
                    })}
                </p>
                
              </div>
            </div>

            
            <div className="flex gap-3 mt-3 flex-wrap">
              <button
                onClick={() =>setSelectedOrder(order)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-2 text-sm hover:bg-slate-800 transition"
              >
                 View Order
              </button>
              <button
                onClick={() => {
                  setIsStatus(order);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-orange-400 text-orange-600 py-2 text-sm hover:bg-orange-50 transition"
              >
                Update Status
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <OrderDetailsModal
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />

      
      <OrderModal
        isStatus={isStatus}
        setIsStatus={setIsStatus}
        updateStatus={updateStatus}
      />
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  );
};

export default OrdersManagement;
