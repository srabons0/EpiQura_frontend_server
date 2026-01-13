import { useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";

const initialNotifications = [
  {
    id: 1,
    type: "success",
    message: "Your payment for Chicken Alfredo has been confirmed!",
    date: "2025-12-17T10:30:00",
    read: false,
  },
  {
    id: 2,
    type: "info",
    message: "New dish 'Spicy Ramen' is available today!",
    date: "2025-12-16T15:20:00",
    read: false,
  },
  {
    id: 3,
    type: "error",
    message: "Your last order failed. Please try again.",
    date: "2025-12-15T12:10:00",
    read: true,
  },
];

const typeColors = {
  success: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
  error: "bg-red-100 text-red-800",
};

const typeIcons = {
  success: <FaCheckCircle />,
  info: <FaInfoCircle />,
  error: <FaTimesCircle />,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaBell /> Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">No notifications available.</p>
      ) : (
        <div className="space-y-4 max-h-[80vh] overflow-y-auto">
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex justify-between items-center p-4 rounded-xl shadow-md ${
                notif.read ? "bg-gray-100" : typeColors[notif.type]
              } hover:shadow-xl cursor-pointer transition`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{typeIcons[notif.type]}</span>
                <div>
                  <p className="font-medium">{notif.message}</p>
                  <p className="text-sm text-gray-600">{new Date(notif.date).toLocaleString()}</p>
                </div>
              </div>
              {!notif.read && <span className="w-3 h-3 rounded-full bg-red-500"></span>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
