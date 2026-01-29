import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaDollarSign, FaCreditCard, FaMoneyBill } from "react-icons/fa";


const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setTimeout(() => setBookings(fakeBookings), 500);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Loading your bookings...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-5 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex justify-end mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="flex gap-4 mb-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt /> {booking.date}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock /> {booking.time}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {booking.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.notes}</p>
                      <p className="text-sm font-medium text-gray-700">
                        Quantity: {item.quantity} | Price: <FaDollarSign className="inline" /> {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-gray-800 font-semibold text-lg">
                <span>Total: <FaDollarSign className="inline" /> {booking.totalPrice}</span>
                <span className="flex items-center gap-2 text-blue-600">
                  {booking.paymentMethod === "Stripe" ? <FaCreditCard /> : <FaMoneyBill />}
                  {booking.paymentMethod}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
