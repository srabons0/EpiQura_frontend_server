import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaUtensils,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import ReportsAnalytics from "./ReportsAnalytics";
import useLoader from "../../hooks/useLoader";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mosaic } from "react-loading-indicators";
import { Link } from "react-router-dom";
import useScrollToTop from "../../components/ui/useScrollToTop";
const recentOrders = [
  {
    id: "ORD-10021",
    customer: "Sadman",
    payment: "Card",
    total: 850,
    status: "Completed",
  },
  {
    id: "ORD-10022",
    customer: "Rahim",
    payment: "COD",
    total: 620,
    status: "Pending",
  },
  {
    id: "ORD-10023",
    customer: "Karim",
    payment: "Card",
    total: 1250,
    status: "Cancelled",
  },
];

const statusStyle = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  useScrollToTop();
  const [{ lastMonth = {}, thisMonth = {} }, isPendingMonthly, refetchMonthly] =
    useLoader("revenueMonthlySummary", `/revenueMonthlySummary`);
  const [soldItemsSummary, isPendingSoldItems, refetchSoldItems] = useLoader(
    "soldItemsSummary",
    `/soldItemsSummary`
  );
  const [orders, isPending, refetch] = useLoader("savedOrder", `/save-order`);

  const trendRevenueMonthly = (
    ((thisMonth.totalRevenue - lastMonth.totalRevenue) /
      lastMonth.totalRevenue) *
    100
  ).toFixed(1);
  const trendOrderMonthly = (
    ((thisMonth.totalOrders - lastMonth.totalOrders) / lastMonth.totalOrders) *
    100
  ).toFixed(1);
  const trendTotalItemsSold = (
    ((thisMonth.totalItemsSold - lastMonth.totalItemsSold) /
      lastMonth.totalItemsSold) *
    100
  ).toFixed(1);
  const trendTotalUsers = (
    ((thisMonth.totalUsers - lastMonth.totalUsers) / lastMonth.totalUsers) *
    100
  ).toFixed(1);

  const kpis = [
    {
      label: "Total Revenue",
      value: `৳ ${thisMonth.totalRevenue ? thisMonth.totalRevenue : 0}`,
      trend: trendRevenueMonthly !== "NaN" ? trendRevenueMonthly : 0,
      icon: <FaMoneyBillWave />,
      color: "green",
    },
    {
      label: "Total Orders",
      value: thisMonth.totalOrders,
      trend: trendOrderMonthly !== "NaN" ? trendOrderMonthly : 0,
      icon: <FaShoppingCart />,
      color: "blue",
    },
    {
      label: "Food Items Sold",
      value: thisMonth.totalItemsSold,
      trend: trendTotalItemsSold !== "NaN" ? trendTotalItemsSold : 0,
      icon: <FaUtensils />,
      color: "orange",
    },
    {
      label: "Customers",
      value: thisMonth.totalUsers,
      trend: trendTotalUsers !== "NaN" ? trendTotalUsers : 0,
      icon: <FaUsers />,
      color: "gray",
    },
  ];

  return (
    <div className=" bg-gray-50 p-6 md:p-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md "
          >
            <div className="flex flex-row-reverse justify-between">
              <div
                className={`flex items-center justify-center h-12 w-12 rounded-xl text-${kpi.color}-600 bg-${kpi.color}-100`}
              >
                {kpi.icon}
              </div>
              <p className="text-sm font-medium text-gray-600 mt-3">
                {kpi.label}
              </p>
            </div>
            {/* Value */}
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>

            {/* Trend */}
            <div
              className={`mt-2 text-sm font-medium flex items-center gap-1 ${
                kpi.trend >= 0 ? `text-${kpi.color}-600` : "text-red-600"
              }`}
            >
              {kpi.trend >= 0 ? "▲" : "▼"} {Math.abs(kpi.trend)}% from last
              month
            </div>

            {/* Decorative shadow circle */}
            <div
              className={`absolute -top-3 -right-3 w-6 h-6 rounded-full bg-${kpi.color}-100 opacity-50`}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Recent Orders
          </h2>

          <div className="overflow-x-auto h-[400px] overflow-y-auto ">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="pb-3 text-left">Order ID</th>
                  <th className="pb-3 text-left">Customer</th>
                  <th className="pb-3 text-left">Payment</th>
                  <th className="pb-3 text-left">Total</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order,idx) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium">ORD-1001{idx+1}</td>
                    <td>{order.name}</td>
                    <td>{order.payment}</td>
                    <td className="font-medium">৳{order.price}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyle[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Top Foods */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top Selling Foods
            </h2>

            <ul className="space-y-4">
              {
isPendingSoldItems && <div className="mt-20 flex justify-center">
  <div className="inline-block scale-[0.5] origin-top">
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
              {soldItemsSummary.byItem?.slice(0, 5).map((food, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-gray-800">{food._id}</span>
                  <span className="text-gray-500">{food.totalQuantity} sold</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>

            <div className="flex flex-col gap-3 text-center">
              <Link to={"/dashboard/admin/manageProducts"} className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition">
                Add New Food
              </Link>
              <Link to={"/dashboard/admin/orders"} className="w-full py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition">
                Manage Orders
              </Link>
              <Link to={"/dashboard/admin/reviews"} className="w-full py-2.5 rounded-xl border border-gray-300 text-sm font-semibold hover:bg-gray-100 transition">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>


      <ReportsAnalytics soldItemsSummary={soldItemsSummary} isPendingSoldItems={isPendingSoldItems} />
    </div>
  );
};

export default AdminDashboard;
