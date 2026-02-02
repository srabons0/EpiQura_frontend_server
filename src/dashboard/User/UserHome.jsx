import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaBook,
  FaStar,
  FaUtensils,
  FaBoxOpen,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import useDataLoader from "../../hooks/useDataLoader";
import RecipeDetails from "../../components/Shared/Recipes/RecipeDetails";

/* ---------------- DATA ---------------- */

const quickActions = [
  { title: "Payments", icon: <FaWallet />, link: "/dashboard/user/payments" },
  { title: "My Orders", icon: <FaBoxOpen />, link: "/dashboard/user/orders" },
  { title: "Reviews", icon: <FaStar />, link: "/dashboard/user/reviews" },
  {
    title: "Notifications",
    icon: <FaUtensils />,
    link: "/dashboard/user/notifications",
  },
];

const chartData = [
  { day: "Mon", spent: 1200 },
  { day: "Tue", spent: 800 },
  { day: "Wed", spent: 1500 },
  { day: "Thu", spent: 900 },
  { day: "Fri", spent: 1300 },
  { day: "Sat", spent: 1600 },
  { day: "Sun", spent: 700 },
];

export default function UserHome() {
  const [timeLeft, setTimeLeft] = useState("");
  const { user, loading } = useAuth();
  const [orders, isPending, refetch] = useLoader(
    "savedOrder",
    `/save-order/${user?.email}`,
    !!user?.email && !loading,
  );
  const [bestSellers, setBestSellers] = useState([]);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/foodItems/BestSellers").then((res) => setBestSellers(res.data));
  }, [data]);

  const [specialOffers, setSpecialOffers] = useState([]);

  useEffect(() => {
    data
      .get("/foodItems/SpecialOffer")
      .then((res) => setSpecialOffers(res.data));
  }, [data]);
  useEffect(() => {
    const update = () => {
      const end = new Date();
      end.setHours(23, 59, 59);
      const diff = end - new Date();
      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      setTimeLeft(`${h}h ${m}m`);
    };
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50  lg:px-10 py-8 space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here’s a quick overview of your activity
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {quickActions.map((a) => (
          <Link
            key={a.title}
            to={a.link}
            className="bg-white border rounded-2xl p-2 md:p-4 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <span className="text-slate-700 text-xl">{a.icon}</span>
            <span className="font-medium text-slate-800 text-sm md:text-base">{a.title}</span>
          </Link>
        ))}
      </div>

      <div className="bg-white border rounded-2xl md:p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-4 p-2">Weekly Spending</h2>
        <div className="w-full h-[220px] text-sm md:text-base">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spent" fill="#111827" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold text-slate-900">Recent Orders</h2>
        </div>

        <div className="divide-y">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order._id}
              className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
            >
              <div>
                <p className="text-sm font-medium text-slate-800 line-clamp-2">
                  {order.orderedItems.map((item) => item.name).join(", ")}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="text-sm text-slate-600">
                Items:{" "}
                <span className="font-semibold">
                  {order.orderedItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  )}
                </span>
              </div>

              <div className="flex sm:flex-col sm:items-end justify-between gap-2">
                <p className="font-semibold text-slate-900">
                  ৳
                  {order.orderedItems.reduce(
                    (sum, item) => sum + item.quantity * item.realPrice,
                    0,
                  )}
                </p>

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full w-fit
                ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 animate-pulse"
                      : "bg-red-100 text-red-700"
                }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-slate-900 to-slate-700 text-white rounded-2xl p-6 shadow-md">
        <h2 className="font-semibold text-white mb-4">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestSellers.map((i) => (
            <div
              key={i.name}
              className="bg-white border rounded-2xl p-5 hover:shadow-md transition"
            >
              <p className="font-medium text-slate-800">{i.name}</p>
              <p className="text-sm text-slate-500 mt-1">৳{i.realPrice}</p>
              <div className="relative flex items-center">
                <span className="text-sm font-medium text-blue-600 mt-3 inline-block">
                  {" "}
                  Order now →
                </span>
                <div className="absolute -left-3 -top-2.5 text-black">
                  <RecipeDetails
                    id={i._id}
                    opacity={"opacity-0"}
                  ></RecipeDetails>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50  md:px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Special Offers
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialOffers.map((i) => (
            <div
              key={i.name}
              className="bg-white border relative rounded-2xl p-5 hover:shadow-md transition"
            >
              {i.specialOffer?.badgeNote && (
                <span
                  className="
            absolute top-4 right-4
            px-3 py-1
            rounded-full
            text-xs font-semibold
            bg-indigo-50 text-indigo-700
          "
                >
                  {i.specialOffer.badgeNote}
                </span>
              )}

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold text-slate-800 leading-tight">
                  {i.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {i.specialOffer?.title}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {i.specialOffer?.description}
                </p>
              </div>
              <div className="flex justify-between mt-5">
               
                <span className="text-xl font-bold text-slate-900">
              ৳{i.realPrice}
            </span>

                <div className="relative flex items-center">
                  <span className="text-sm font-medium text-blue-600 mt-3 inline-block">
                    {" "}
                    Order now →
                  </span>
                  <div className="absolute -left-3 -top-2.5 text-black">
                    <RecipeDetails
                      id={i._id}
                      opacity={"opacity-0"}
                    ></RecipeDetails>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
