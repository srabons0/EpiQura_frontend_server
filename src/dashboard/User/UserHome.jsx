import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWallet, FaBook, FaStar, FaUtensils } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

// Fake recent orders
const recentOrders = [
  {
    _id: "1",
    items: [
      { name: "Chicken Alfredo", img: "https://i.ibb.co/f1nGjkN/chicken-alfredo-1-2.jpg", quantity: 1 },
      { name: "BLT Sandwich", img: "https://i.ibb.co/x1Pmqrj/BLT-for-recipe-1-6-1200x675.jpg", quantity: 2 },
    ],
    date: "2025-12-16",
    time: "19:00",
    total: 1300,
    status: "Confirmed",
  },
  {
    _id: "2",
    items: [
      { name: "Margherita Pizza", img: "https://i.ibb.co/5vG6r9k/margherita-pizza.jpg", quantity: 2 },
    ],
    date: "2025-12-18",
    time: "13:30",
    total: 1600,
    status: "Pending",
  },
];

// Fake recommended dishes
const recommended = [
  { name: "Veggie Delight Pizza", img: "https://i.ibb.co/9hjz8y7/veggie-pizza.jpg", price: 750 },
  { name: "Spicy Ramen", img: "https://i.ibb.co/zRZx0xD/spicy-ramen.jpg", price: 650 },
  { name: "Chocolate Brownie", img: "https://i.ibb.co/8bZ2Lhx/brownie.jpg", price: 250 },
];

// Fake spending data for chart
const chartData = [
  { day: "Mon", spent: 1200 },
  { day: "Tue", spent: 800 },
  { day: "Wed", spent: 1500 },
  { day: "Thu", spent: 900 },
  { day: "Fri", spent: 1300 },
  { day: "Sat", spent: 1600 },
  { day: "Sun", spent: 700 },
];

// Quick Actions
const quickActions = [
  { title: "Payments", icon: <FaWallet className="w-6 h-6" />, link: "/dashboard/paymentHistory", bg: "bg-gradient-to-tr from-yellow-400 to-yellow-600" },
  { title: "Bookings", icon: <FaBook className="w-6 h-6" />, link: "/dashboard/myBooking", bg: "bg-gradient-to-tr from-green-400 to-green-600" },
  { title: "Reviews", icon: <FaStar className="w-6 h-6" />, link: "/dashboard/addReview", bg: "bg-gradient-to-tr from-blue-400 to-blue-600" },
  { title: "Menu", icon: <FaUtensils className="w-6 h-6" />, link: "/menu", bg: "bg-gradient-to-tr from-red-400 to-red-600" },
];

// Fake daily offers
const dailyOffers = [
  { name: "Cheese Burger", img: "https://i.ibb.co/cyVHQF1/cheese-burger.jpg", price: 550, discount: 20 },
  { name: "Sushi Set", img: "https://i.ibb.co/2y3Ww0Y/sushi-set.jpg", price: 1200, discount: 15 },
];

const UserHome = () => {
  // Countdown timer for daily offers
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999); // countdown to end of day
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col gap-6">

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-orange-400 to-pink-400 p-6 rounded-2xl shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Hello, Sadman!</h1>
          <p className="text-lg md:text-xl mt-1">Check your activity summary and explore exciting dishes!</p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl flex flex-col items-center">
              <p className="text-lg font-bold">12</p><p className="text-sm">Payments</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-xl flex flex-col items-center">
              <p className="text-lg font-bold">8</p><p className="text-sm">Bookings</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-xl flex flex-col items-center">
              <p className="text-lg font-bold">5</p><p className="text-sm">Reviews</p>
            </div>
          </div>
        </div>
        <img src="https://i.ibb.co/HxYvX4X/food-dashboard.png" alt="Food illustration" className="w-40 md:w-60" />
      </motion.div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl shadow-lg text-white cursor-pointer ${action.bg}`}
          >
            {action.icon}
            <Link to={action.link} className="text-lg font-semibold">{action.title}</Link>
          </motion.div>
        ))}
      </div>

      {/* Weekly Spending Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Spending</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spent" fill="#FF8008" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto hide-scrollbar">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recent Orders</h2>
        {recentOrders.map((order) => (
          <motion.div
            key={order._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-4 relative"
          >
            <div className="flex gap-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <p className="text-sm mt-1 font-medium">{item.name} x{item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center text-gray-800 gap-1">
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Time:</strong> {order.time}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                className={`font-bold ${order.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}
              >
                Status: {order.status}
              </motion.p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Link to="/dashboard/myBooking" className="text-blue-600 font-semibold hover:underline">View Details</Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Section with Parallax Hover */}
      <div className="flex flex-col gap-3 mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5, rotate: 0.5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-green-600 font-bold mt-1">${item.price}</p>
                <Link to="/menu" className="text-blue-600 mt-2 block hover:underline font-medium">Order Now</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Offers Section with Countdown */}
      <div className="flex flex-col gap-3 mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Daily Offers</h2>
        <p className="text-gray-500">Hurry! Offers end in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dailyOffers.map((offer, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer relative"
            >
              <img src={offer.img} alt={offer.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="font-semibold text-gray-800">{offer.name}</p>
                <p className="text-green-600 font-bold mt-1">${offer.price} - {offer.discount}% Off</p>
                <Link to="/menu" className="text-blue-600 mt-2 block hover:underline font-medium">Order Now</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
