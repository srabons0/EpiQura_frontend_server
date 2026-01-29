import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import "./style.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useLoader from "../hooks/useLoader";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Successfully updated! Set Your Info!');

const PaymentForm = () => {
const axiosSecure = useAxiosSecure();
const {user, loading} = useAuth();
// console.log("Current User:", user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

const [users, isPending, refetch] = useLoader(
    "user",
    `/user?email=${user.email}`,
    !!user?.email && !loading
  );
  // console.log(users);
useEffect(() => {
  if (users) {
    reset();
  }
}, [users, reset]);
  const onSubmit = async(data) => {
    // console.log("Order Data:", data);

    const info = {
        name: data.name,
        phone: data.phone,
        address: data.address,
    }

   const res = await axiosSecure.patch(`/user?email=${user?.email}`,info)
    console.log("Server Response:", res.data);
    if (res.data.modifiedCount > 0) {
        notify();
        refetch();
        // reset();
    }


    reset();
  };

  return (
  <div className="w-full mt-15 md:mt-0 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-xl relative rounded-2xl p-0.5 bg-linear-to-r from-orange-400 via-orange-300 to-yellow-400">
    
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#FF8008] mb-6">
        Set Your Info
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            defaultValue={users.name}
            {...register("name", { required: "Name is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            defaultValue={users.phone}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Enter a valid 11-digit number",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-base sm:text-lg font-semibold mb-2">
            Address
          </label>
          <textarea
            rows="3"
            placeholder="House / Road / Area"
            defaultValue={users.address}
            {...register("address", { required: "Address is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 rounded-lg py-3 text-lg font-semibold text-white bg-linear-to-r from-[#FF8008] via-[#FFC837] to-[#FF8008] bg-size-[200%_auto] transition-all duration-500 hover:bg-position-[right_center]"
        >
          Set Your Info
        </motion.button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  </div>

  <p className="mt-4 text-center text-base sm:text-lg font-semibold text-black">
    {users.phone && users.address
      ? "Your info is already set."
      : `Please set your ${
          users.address ? "" : "Address"
        } ${users.phone || users.address ? "" : "and"} ${
          users.phone ? "" : "Phone number"
        }.`}
  </p>
</div>

  );
}
export default PaymentForm;