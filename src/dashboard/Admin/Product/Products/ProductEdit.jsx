import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BsArrow90DegUp } from "react-icons/bs";
import useDataLoader from "../../../../hooks/useDataLoader";

const ProductEdit = ({ product, categories, onClose, onUpdate }) => {
  if (!product) return null;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      menuSection: product.menuSection,
    },
  });
  const [images, setImages] = useState(false);
  const [specialOffer, setSpecialOffer] = useState(product.menuSection);
  const dataloader = useDataLoader();
  const [imBb, setImBb] = useState();
  const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`;
  // console.log(specialOffer);
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

  // console.log(product);
  const onSubmit = (data) => {
    const info = {
      id1: product._id,
      name: data.name,
      additionalNote: data.additionalNote,
      type: data.category,
      menuSection: data.menuSection,
      cookingTime: data.cookingTime,
      realPrice: data.price,
      ingredients: data.ingredients,
      img: imBb ? imBb : product.img,
      specialOffer: {
        title: data.title,
        badgeNote: data.badgeNote,
        description: data.description,
      },
    };
    onUpdate(info);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none mb-5 
              text-base "
                  placeholder="Name"
                  defaultValue={product.name}
                  {...register("name")}
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none mb-5 
              text-base "
                  placeholder="Price"
                  defaultValue={product.realPrice}
                  {...register("price")}
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cooking Time
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none mb-5 
              text-base "
                  placeholder="CookingTime"
                  defaultValue={product.cookingTime}
                  {...register("cookingTime")}
                />

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="select rounded-lg select-bordered text-base  h-12 px-4 py-3 mb-4 mt-3 w-full bg-[#ffffff] focus:ring-2 focus:ring-orange-400 outline-none text-black border-gray-300 border-2"
                  placeholder="Category"
                  {...register("category")}
                  defaultValue={product.type}
                >
                  <option value="TopFoodList">Top Food List</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty Menu Sections
                </label>
                <select
                  onClick={(e) => setSpecialOffer(e.target.value)}
                  className="select rounded-lg select-bordered text-base h-12 px-4 py-3 mb-4 mt-3 w-full bg-[#ffffff] focus:ring-2 focus:ring-orange-400 outline-none text-black border-gray-300 border-2 "
                  required
                  {...register("menuSection")}
                >
                  <option disabled value="">
                    Specialty Menu Section Category
                  </option>

                  <option value="Regular">Regular Dish</option>
                  <option value="TopFood">Top Food</option>
                  <option value="SpecialOffer">Special Offer</option>
                  <option value="Popular">Popular</option>
                  <option value="BestSellers">Best Sellers</option>
                </select>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Note
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none 
              text-base "
                  placeholder="Additional Note, optional"
                  defaultValue={product.additionalNote}
                  {...register("additionalNote")}
                />
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <img
                    className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 
                rounded-full object-cover border-4 border-gray-200 shadow-md"
                    src={images ? images : product.img}
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
                  your recipe photo
                </p>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingredients
                  </label>
                  <textarea
                    className="w-full h-28 md:h-32 px-4 py-3 rounded-xl 
                border border-gray-300 focus:ring-2 focus:ring-orange-400 
                outline-none text-base  resize-none"
                    defaultValue={product.ingredients}
                    placeholder="Ingredients"
                    {...register("ingredients")}
                  />
                </div>
              </div>
            </div>
            {((product.menuSection === "SpecialOffer" &&
              specialOffer === "SpecialOffer") ||
              specialOffer === "SpecialOffer") && (
              <div className="w-full flex items-center gap-6 justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    className="w-full px-4 py-3  mb-5 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none 
              text-base "
                    placeholder="Title"
                    defaultValue={product.title}
                    {...register("title")}
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none 
              text-base "
                    placeholder="Description"
                    defaultValue={product.description}
                    {...register("description")}
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Badge Note
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-orange-400 outline-none 
              text-base "
                    placeholder="Badge Note"
                    defaultValue={product.badgeNote}
                    {...register("badgeNote")}
                  />
                </div>
              </div>
            )}

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

export default ProductEdit;
