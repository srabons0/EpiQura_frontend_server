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

const AdminProfile = () => {
  useScrollToTop();
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
    <div className="min-h-screen bg-gray-50 py-8 md:p-10 flex flex-col gap-10">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left"
  >
    Profile Details
  </motion.h2>

  <motion.form
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onSubmit={handleSubmit(onSubmit)}
    className="
      bg-white
      shadow-xl
      rounded-2xl
      p-6 md:p-10
      w-full
      max-w-3xl
      mx-auto
      flex
      flex-col
      gap-8
    "
  >
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-gray-700">
        Profile Picture
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          className="
            w-32 h-32 md:w-36 md:h-36
            object-cover
            rounded-full
            border-2 border-gray-400
            shadow-md
          "
          src={images || user?.photoURL || photoUploader}
          alt=""
        />

        <div className="relative">
          <label
            className="
              cursor-pointer
              inline-flex
              items-center
              justify-center
              px-6
              py-2
              rounded-lg
              border-2
              border-gray-400
              font-semibold
              text-gray-700
              hover:bg-gray-100
              transition
            "
          >
            Update Photo
            <input
              type="file"
              {...register("image")}
              onInput={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-gray-700">
        Profile Information
      </h3>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <FaUser /> Name
        </label>
        <input
          defaultValue={users.name}
          {...register("name", { required: "Name is required" })}
          className="input-field"
        />
        {errors.name && (
          <p className="error-text">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <FaEnvelope /> Email
        </label>
        <input
          type="email"
          defaultValue={users.email}
          {...register("email", { required: "Email is required" })}
          className="input-field"
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <FaPhone /> Phone
        </label>
        <input
          type="tel"
          defaultValue={users.phone}
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{11}$/,
              message: "Enter a valid 11-digit number",
            },
          })}
          className="input-field"
        />
        {errors.phone && (
          <p className="error-text">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <FaMapMarkerAlt /> Address
        </label>
        <input
          defaultValue={users.address}
          {...register("address", { required: "Address is required" })}
          className="input-field"
        />
        {errors.address && (
          <p className="error-text">{errors.address.message}</p>
        )}
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type="submit"
      className="
        bg-linear-to-r
        from-yellow-400
        to-orange-500
        text-white
        font-bold
        py-3
        rounded-xl
        shadow-lg
        hover:shadow-xl
        transition
      "
    >
      Save Changes
    </motion.button>
  </motion.form>

  <Logout />
  <Toaster position="top-center" />
</div>

  );
};

export default AdminProfile;
