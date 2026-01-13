import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BsArrow90DegUp } from "react-icons/bs";
import useDataLoader from "../../../../hooks/useDataLoader";


const CategoryEdit = ({ category, onClose, onUpdate }) => {
  if (!category) return null;
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState(false);
  const dataloader = useDataLoader();
  const [imBb, setImBb] = useState();
  const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`;

  const handleImageUpload = async (event) => {
    // console.log(event)
    const imageFile = { image: event.target.files[0] };
    // console.log(imageFile);

    if (imageFile.image !== undefined) {
      const res = await dataloader.post(image_url, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setImBb(res.data.data.display_url);
      // console.log(res.data.data.display_url);
    }

    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      setImages(URL.createObjectURL(file));
    } else {
      setImages(false);
    }
  };

  // console.log(category);
  const onSubmit = (data) => {
    const info = {
      id1: category._id,
      name: data.name,
      img: imBb ? imBb : category.img,
    };
    onUpdate(info);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-10 
      w-9 h-9 md:w-10 md:h-10 flex items-center justify-center 
      rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <FaTimes className="text-gray-700 text-sm md:text-base" />
        </button>

        <div className="w-full max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-8 md:p-10">
          <p
            className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 md:mb-12 
        font-semibold tracking-tight text-gray-900"
          >
            Update Your Recipe
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:gap-12">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <img
                      className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 
                rounded-full object-cover border-4 border-gray-200 shadow-md"
                      src={images ? images : category.img}
                      alt=""
                    />
                    <input
                      onInput={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      {...register("image")}
                      type="file"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium flex ">
                    <BsArrow90DegUp className="font-semibold w-4 h-4" /> Upload
                    Your Category Photo
                  </p>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none mb-5 
              text-base "
                  placeholder="Name"
                  defaultValue={category.name}
                  {...register("name")}
                />
              </div>
            </div>

            <button
              className="mt-10 md:mt-12 w-2/3 mx-auto py-3 md:py-4 rounded-xl 
                 text-base md:text-lg font-semibold text-white 
                   bg-linear-to-r from-orange-500 to-yellow-400 
                     hover:opacity-90 transition block"
            >
              Update Recipe
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryEdit;
