import { use, useEffect, useState } from "react";
import photoUploader from "/assets/logo/photoUploader.PNG";
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

const UserProfile = () => {
  const { user, loading, updatedUserProfile } = useAuth();
  const [images, setImages] = useState("");
  const dataloader = useDataLoader();
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
  // console.log(users);

  useEffect(() => {
    if (users) {
      reset();
    }
  }, [users, reset]);

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
    if (result.data.modifiedCount > 0 || result.data.acknowledged) {
      updatedUserProfile(data.name, res?.data?.data?.display_url || "").then(
        (data) => {
          console.log("userprofile updated", data);
          toast.success("Successfully your order has been placed!");
          refetch();
        }
      )
      .catch((error) => {
        console.log(error);
      });
    }
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
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800"
      >
        Profile Details
      </motion.h2>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl flex flex-col gap-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Profile Picture
        </h3>
        <div className="w-2/3 flex items-center gap-5">
          <img
            className=" w-36 h-36 object-cover rounded-full transition duration-300 group-hover:scale-[1.03] border-[#666666] border-2"
            src={images ? images : user?.photoURL ? user?.photoURL : photoUploader}
            alt=""
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" relative flex items-center rounded-lg border-[#a9a9a9] border-2 justify-center w-40 h-10 cursor-pointer"
          >
            <label className="text-lg font-bold ">Update Photo</label>
            <input
              onInput={handleImageUpload}
              className="bg-black w-full h-full absolute -top-0.5 left-0 opacity-5"
              {...register("image")}
              type="file"
              name="image"
              id=""
            />
          </motion.div>
        </div>

        {/* Personal Information */}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Profile Information
        </h3>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaUser /> Name
          </label>
          <input
            type="text"
            defaultValue={users.name}
            className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaEnvelope /> Email
          </label>
          <input
            type="email"
            defaultValue={users.email}
            className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaPhone /> Phone
          </label>
          <input
            type="tel"
            defaultValue={users.phone}
            className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaMapMarkerAlt /> Address
          </label>
          <input
            type="text"
            defaultValue={users.address}
            className="p-3 border rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="bg-linear-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg mt-4 hover:shadow-xl"
        >
          Save Changes
        </motion.button>
      </motion.form>

      <Toaster position="top-center" reverseOrder={false} />

      <Logout></Logout>
    </div>
  );
};

export default UserProfile;
