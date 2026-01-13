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
    <div className="p-1 w-[40%] rounded-xl mx-auto
            gradient-border">
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg ">
      <h2 className="text-3xl text-[#FF8008] font-semibold mb-6 text-center">
       Set Your Info
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Customer Name */}
        <div>
                <p className="font-semibold text-xl mb-2">Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border-2 border-[#00000038] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue={users.name}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
                <p className="font-semibold text-xl mb-2">Phone Number</p>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3  border-2 border-[#00000038] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            defaultValue={users.phone}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Enter a valid 11-digit number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
                <p className="font-semibold text-xl mb-2">address</p>
          <textarea
            placeholder="Delivery Address. Example: House / Road / Area"
            rows="3"
            defaultValue={users.address}
            className="w-full p-3 border-2 border-[#00000038]  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
        <button
          className="w-full mt-4 px-6 py-3 text-white text-lg font-medium rounded-lg transition-all duration-500 bg-[linear-gradient(to_right,#FF8008_0%,#FFC837_51%,#FF8008_100%)] bg-size-[200%_auto] hover:bg-position-[right_center]"
        >
          Set Your Info
        </button>
</motion.div>
      </form>
       <Toaster 
         position="top-center"
  reverseOrder={false}/>

    </div>
    {users.phone && users.address ? (
      <p className="text-white text-lg font-semibold text-center mt-4">
        Your info is already set.
      </p>
    ):
    (
      <p className="text-white text-lg font-semibold text-center mt-4">
        Please set your {users.address ? "" : "Address"} {users.phone || users.address ? "" : "and"} {users.phone ? "" : "Phone number"}.
      </p>
    )}
    </div>
  );
}
export default PaymentForm;