import { use, useEffect, useState } from "react";
import photoUploader from "/assets/logo/photoUploader.png";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import ImageUploader from "../../components/ui/ImageUploader";
import useAuth from "../../hooks/useAuth";
import useLoader from "../../hooks/useLoader";
import { useForm } from "react-hook-form";
import useDataLoader from "../../hooks/useDataLoader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`;
import { FaSignOutAlt, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/ui/logout";
import useScrollToTop from "../../components/ui/useScrollToTop";

const UserProfile = () => {
  const { user, loading, updatedUserProfile } = useAuth();
  const [images, setImages] = useState("");
  const dataloader = useDataLoader();
  useScrollToTop();
  const axiosSecure = useAxiosSecure();
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
  console.log(users);
  console.log(user);

  const navigate = useNavigate();
  // const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      // await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] || users?.photo };
    // console.log(imageFile);
    const res = await dataloader.post(image_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const info = {
      name: data.name,
      photo: res?.data?.data?.display_url || "",
      email: data.email,
      phone: data.phone,
      address: data.address,
    };
    console.log(info);

    const result = await axiosSecure.patch(`/user?email=${user?.email}`, info);
    console.log(result.data,"user info updated");
      updatedUserProfile(data.name, res?.data?.data?.display_url || "").then(
        (data) => {
          // console.log("userprofile updated", data);
          toast.success("Successfully your order has been placed!");
          refetch();
        }
      )
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update profile. Try again.");
      });
    
    reset();
  };

  const handleImageUpload = (event) => {
    // console.log(event)
    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      setImages(URL.createObjectURL(file));
    } else {
      setImages(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50  lg:px-10 py-10">
  <motion.h2
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-2xl sm:text-3xl font-bold text-slate-800 mb-10 text-center"
  >
    Profile Details
  </motion.h2>

  <motion.form
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    onSubmit={handleSubmit(onSubmit)}
    className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 space-y-10"
  >
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <img
        src={
          images
            ? images
            : user?.photoURL
            ? user.photoURL
            : photoUploader
        }
        alt="Profile"
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-slate-200"
      />

      <label className="relative cursor-pointer">
        <input
          type="file"
          {...register("image")}
          onInput={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="px-6 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
          Update Photo
        </div>
      </label>
    </div>

    <div className="border-t border-slate-200" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FaUser /> Name
        </label>
        <input
          type="text"
          defaultValue={users.name}
          {...register("name")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FaEnvelope /> Email
        </label>
        <input
          type="email" disabled
          defaultValue={users.email}
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FaPhone /> Phone
        </label>
        <input
          type="tel"
          defaultValue={users.phone}
          {...register("phone", {
            
            pattern: {
              value: /^[0-9]{11}$/,
              message: "Enter a valid 11-digit number",
            },
          })}
          className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FaMapMarkerAlt /> Address
        </label>
        <input
          type="text"
          defaultValue={users.address}
          {...register("address")}
          className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      className="w-full sm:w-auto px-10 py-3 rounded-xl font-bold text-white bg-linear-to-r from-yellow-400 to-orange-500 shadow-lg hover:shadow-xl transition"
    >
      Save Changes
    </motion.button>
  </motion.form>

  <Toaster position="top-center" reverseOrder={false} />

  <div className="mt-10 flex justify-center">
    <Logout />
  </div>
</div>

  );
};

export default UserProfile;
