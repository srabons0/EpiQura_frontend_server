import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import EditUserModal from "./EditUserModal";
import useLoader from "../../../hooks/useLoader";
import { BsPersonCircle } from "react-icons/bs";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import { Mosaic } from "react-loading-indicators";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const UsersManagement = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filter, setFilter] = useState("All");
const axiosSecure = useAxiosSecure();
  const [{ allUsers: users = [],total, totalPage }, isPending, refetch] = useLoader("AllUser", `/users?page=${page}&limit=${limit}&role=${filter}&search=${search}`);
// console.log(users, totalPage, total);
  useEffect(() => {
    if (totalPages !== totalPage && users.length > 0) {
      setTotalPages(totalPage);
    }
  }, [totalPage, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

const handleDelete = async (id) => {
//  return console.log(id);

   Swal.fire({
      title: "Are You Certain You Want To Deleted?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // console.log(res.data);
      toast.success("user has been successfully Deleted!");
          refetch();
          }
         
        });
      }
    });
};


  return (
    <div className="min-h-screen px-4 md:px-8 py-8 bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
          Users Management
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Users", value: total },
          {
            label: "Active Users",
            value: users.filter((u) => u.status === "active").length,
          },
          {
            label: "Admins",
            value: users.filter((u) => u.role === "admin").length,
          },
          {
            label: "Blocked",
            value: users.filter((u) => u.status === "blocked").length,
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-white/70 backdrop-blur border border-slate-200 px-4 py-3 shadow-sm"
          >
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by User ID or Name"
            className="w-full rounded-xl border border-gray-300 px-10 py-2 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>
         <div className=" flex justify-center ">
          <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-md">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-2 py-2  font-semibold rounded-full
        bg-gray-100 hover:bg-gray-200
        disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IoIosArrowBack />
            </button>
            {[page - 1, page, page + 1]
              .filter((p) => p > 0 && p <= totalPages)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center
            rounded-full text-xs font-bold transition-all
            ${
              page === p
                ? "bg-linear-to-r from-[#ff7904] to-[#ff0000] text-white shadow scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
                >
                  {p}
                </button>
              ))}

        
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-2 py-2  font-semibold rounded-full
        bg-gray-100 hover:bg-gray-200
        disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-300 px-10 py-2 outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All Users</option>
          <option value="user">Users</option>
          <option value="admin">Admin</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
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

{ users.length === 0 && !isPending &&(<div className="flex flex-col items-center justify-center h-80 text-center">
      <h2 className="text-xl font-bold text-gray-500">
        No Users Available
      </h2>
    </div>)}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay:  0.2 }}
            className="
              group relative rounded-2xl bg-white border border-slate-200
              p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]
            "
          >
            <div className="flex items-center gap-4 mb-4">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
              ) : (
                <BsPersonCircle
                  onClick={() => setIsOpen((prev) => !prev)}
                  className=" w-12 h-12 "
                />
              )}
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              {user.role === "Admin" && (
                <FaUserShield className="text-orange-500 text-lg" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm mb-5">
              <div>
                <p className="text-slate-400 text-xs">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Orders</p>
                <p className="font-medium">{user.orders ? user.orders : "0"}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Joined</p>
                <p className="font-medium">
                  {user?.created_at &&
                    new Date(user.created_at).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Status</p>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setIsEditOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white py-2 text-sm hover:bg-slate-800 transition"
              >
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(user._id)} className="flex items-center justify-center rounded-xl border border-red-200 text-red-600 px-4 hover:bg-red-50 transition">
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
        refetch={refetch}
      />

      <Toaster position="top-right"
  reverseOrder={false}/>
    </div>
  );
};

export default UsersManagement;
