import { useForm } from "react-hook-form";
import img from "/assets/logo/photoUploader.PNG";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useLoader from "../../../../hooks/useLoader";
import useDataLoader from "../../../../hooks/useDataLoader";
const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`;
const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [images, setImages] = useState(false);
  const [specialOffer, setSpecialOffer] = useState("Regular");
  const dataloader = useDataLoader();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [selectCategory, categoryIsPending, categoryRefetch] = useLoader(
    "category",
    `/category`,
  );
  const onSubmit = async (data) => {
    if (data.price <= 0 || data.cookingTime <= 0) {
      return setError("Price and Cooking time must be greater than zero.");
    }

    if (data.menuSection === "default" && data.category === "default") {
      return setError("Please select your category to proceed.");
    }

    const imageFile = { image: data.image[0] };
    const res = await dataloader.post(image_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const info = {
      name: data.name,
      additionalNote: data.additionalNote,
      type: data.category,
      menuSection: data.menuSection,
      cookingTime: data.cookingTime,
      realPrice: data.price,
      added_at: new Date().toISOString(),
      ingredients: data.ingredients,
      img: res.data.data.display_url,
       specialOffer: {
        title: data.title,
        badgeNote: data.badgeNote,
        description: data.description,
      },
    };
    console.log(info);

    if (res.data.success) {
      const res = await axiosSecure.post("/foodItem", info);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "your food item added",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        reset();
        setImages(false);
      }
    }
  };
  const handleImageUpload = (event) => {
    // console.log(event)
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImages(URL.createObjectURL(file));
    } else {
      setImages(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10">

    <h2 className="text-xl lg:text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 tracking-tight">
      Add Your Recipe
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div className="space-y-5">

          <div>
            <label className="font-semibold text-slate-700">Recipe Name</label>
            <input
              {...register("name")}
              required
              placeholder="Recipe name"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700">Price</label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              required
              placeholder="Price"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700">Cooking Time (minutes)</label>
            <input
              {...register("cookingTime")}
              type="number"
              required
              placeholder="Cooking time"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700">Category</label>
            <select
              {...register("category")}
              defaultValue="default"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option disabled value="default">
                Choose category
              </option>
              {selectCategory.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700">
              Menu Section
            </label>
            <select
              {...register("menuSection")}
              onChange={(e) => setSpecialOffer(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option disabled value="">
                Select section
              </option>
              <option value="Regular">Regular Dish</option>
              <option value="TopFood">Top Food</option>
              <option value="SpecialOffer">Special Offer</option>
              <option value="Popular">Popular</option>
              <option value="BestSellers">Best Sellers</option>
            </select>
          </div>

          {error && (
            <p className="text-red-600 font-semibold">{error}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">

          <div className="relative group">
            <img
              src={images ? images : img}
              alt=""
              className="w-60 h-60 rounded-full object-cover border-4 border-orange-400 shadow-xl"
            />
            <input
              {...register("image")}
              onInput={handleImageUpload}
              required
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer z-50"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span className="text-white font-semibold">
              Upload Photo
            </span>
          </div>
          </div>

          <p className="font-semibold text-slate-600">
            Upload Recipe Image
          </p>

          <div className="w-full space-y-4">
            <div>
              <label className="font-semibold text-slate-700">
                Additional Note
              </label>
              <input
                {...register("additionalNote")}
                placeholder="Optional"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700">
                Ingredients
              </label>
              <textarea
                {...register("ingredients")}
                required
                placeholder="List ingredients"
                className="mt-2 w-full h-28 resize-none rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {specialOffer === "SpecialOffer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-slate-700">Offer Title</label>
            <input
              {...register("title")}
              placeholder="Offer title"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            <label className="font-semibold text-slate-700 mt-4 block">
              Description
            </label>
            <input
              {...register("description")}
              placeholder="Offer description"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700">Badge Note</label>
            <input
              {...register("badgeNote")}
              placeholder="Limited / Hot Deal"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="
          w-full py-4 rounded-2xl text-lg font-bold text-white
          bg-linear-to-r from-orange-400 to-orange-600
          shadow-lg hover:shadow-2xl transition
        "
      >
        Add Recipe
      </button>
    </form>
  </div>
</div>

  );
};

export default AddProduct;
