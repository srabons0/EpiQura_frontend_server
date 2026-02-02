import { useState } from "react";
import img from "/assets/logo/photoUploader.png";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useDataLoader from "../../../../hooks/useDataLoader";
const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`;

const AddCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [images, setImages] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dataLoader = useDataLoader();

  const onSubmit = async (data) => {
    console.log(data.image[0]);
    const imageFile = { image: data.image[0] };
    const res = await dataLoader.post(image_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data.data.display_url);
    console.log(imageFile);
    const info = {
      name: data.name,
      img: res.data.data.display_url,
    };

    if (res.data.success) {
      const res = await axiosSecure.post("/category", info);
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
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
        <h2 className="text-xl lg:text-3xl sm:text-4xl font-bold text-center text-slate-800 mb-10">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={images ? images : img}
                alt="Category"
                className="w-52 h-52 rounded-full object-cover border-4 border-orange-400 shadow-lg"
              />

              <input
                type="file"
                {...register("image")}
                required
                onInput={handleImageUpload}
                className="absolute inset-0 opacity-0  z-50 cursor-pointer"
              />

              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white font-semibold">Upload Photo</span>
              </div>
            </div>

            <p className="text-sm text-slate-500">Upload category image</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category Name
            </label>
            <input
              {...register("name")}
              required
              placeholder="Enter category name"
              className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-800
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                     transition"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600
                   text-white font-semibold text-lg shadow-lg transition active:scale-95"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
