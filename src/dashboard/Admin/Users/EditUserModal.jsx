import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { scale: 0.9, opacity: 0, y: 40 },
  visible: { scale: 1, opacity: 1, y: 0 },
};

const EditUserModal = ({ isOpen, onClose, user, refetch }) => {
  if (!user) return null;
const axiosSecure = useAxiosSecure();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const form = e.target;
    const updatedUser = {
      ...user,
      role: form.role.value,
      status: form.status.value,
    };
    const result = await axiosSecure.patch(`/user?email=${user?.email}`, updatedUser);
    // console.log("Server Response:", result.data);
    if (result.data.modifiedCount > 0) {
      toast.success("Successfully updated!");
      refetch();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25 ,delay:0.15, ease: "easeOut" }}
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
           
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Edit User
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>

            
            <form  onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Name
                </label>
                <input
                  name="name" disabled
                  defaultValue={user.name}
                  className="w-full rounded-xl bg-slate-100 border border-slate-200 px-4 py-2.5 text-slate-500"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Email
                </label>
                <input
                  value={user.email}
                  disabled
                  className="w-full rounded-xl bg-slate-100 border border-slate-200 px-4 py-2.5 text-slate-500"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  defaultValue={user.role}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  defaultValue={user.status}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border px-5 py-2 text-sm hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2 text-sm text-white hover:bg-slate-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
            <Toaster position="top-right"
  reverseOrder={false}/>
    </AnimatePresence>
  );
};

export default EditUserModal;
