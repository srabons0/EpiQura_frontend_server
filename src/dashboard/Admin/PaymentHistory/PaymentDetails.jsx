import { motion, AnimatePresence } from "framer-motion";

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null;

  const totalItemsPrice = payment.orderedItems.reduce(
    (sum, item) => sum + item.quantity * item.realPrice,
    0
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className=" w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 relative bg-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
      
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-4 top-4"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold mb-6">Payment Details</h3>

      
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Transaction ID</p>
              <p className="font-semibold text-xs text-gray-600">#{payment.transcriptionId}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Order ID</p>
              <p className="font-semibold text-xs text-gray-600">#{payment._id}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span className="badge badge-success text-white font-medium">
                {payment.status}
              </span>
            </div>
          </div>

          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-xl p-4">
              <h4 className="font-bold mb-3">Customer Info</h4>
              <p><strong>Name:</strong> {payment.name}</p>
              <p><strong>Email:</strong> {payment.email}</p>
              <p><strong>Phone:</strong> {payment.number}</p>
              <p><strong>Address:</strong> {payment.address}</p>
            </div>

            <div className="border rounded-xl p-4">
              <h4 className="font-bold mb-3">Payment Info</h4>
              <p><strong>Method:</strong> {payment.payment === "Paid"? "STRIPE": "COD"}</p>
              <p><strong>Amount:</strong> ৳ {totalItemsPrice}</p>
              <p><strong>Currency:</strong> BDT </p>
              <p>
                <strong>Paid At: </strong>
                 {new Date(payment.date).toLocaleString()}
              </p>
            </div>
          </div>

          
          <div className="border rounded-xl p-3 mb-6">
            <h4 className="font-bold mb-4">Order Items</h4>

            <table className="table">
              <thead>
                <tr className="text-black">
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {payment.orderedItems.map((item, index) => (
                  <tr className="font-medium" key={index}>
                    <td>{item.name} ({item.offer})</td>
                    <td>{item.quantity}</td>
                    <td>৳ {item.realPrice}</td>
                    <td>৳ {item.quantity * item.realPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right font-bold mt-4">
              Grand Total: ৳ {totalItemsPrice}
            </div>
          </div>

         
          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentDetailsModal;
