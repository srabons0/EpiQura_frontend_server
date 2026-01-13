import { useState } from "react";
import img from "/assets/logo/photoUploader.PNG";
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
    <div>
      <div className="w-10/12 mx-auto border-4 p-10 rounded-lg mt-20 border-[#000000] bg-[#f8b44d]  text-white">
        <p className="text-4xl text-center mb-10 font-bold  underline underline-offset-4">
          Add Category
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-col items-center justify-center gap-5 mb-8">
              <div className="relative">
                <img
                  className=" w-64 h-64 text-white outline-8 outline-[#ffc670]
                    shadow-lg bg-[#ffb443] object-contain rounded-full border-[#ffffff] border-8 drop-shadow-lg"
                  src={images ? images : img}
                  alt=""
                />
                <input
                  onInput={handleImageUpload}
                  className="bg-black w-64 h-64 rounded-full absolute
                                cursor-pointer top-0 left-0 opacity-0"
                  {...register("image")}
                  required
                  type="file"
                  name="image"
                  id=""
                />
              </div>
              <label className="text-lg font-bold ">
                Upload Your Category Photo Here
              </label>
            </div>

            <div className="w-2/3 mx-auto mt-7">
              <label className="text-lg font-bold ">Category Name</label>
              <input
                className="input placeholder:text-lg  text-lg font-semibold input-bordered mt-3 mb-4 w-full
         bg-[#ffffff19] border-[#ffffff] border-2 placeholder:text-white"
                placeholder="Category Name"
                required
                {...register("name")}
              />
            </div>
         
          <button className="border-[#ffffff] border-2 btn w-full bg-[#ffffff19] hover:border-[#ff8400ae] rounded-lg py-3 h-12 hover:bg-[#ffaa2b] text-lg font-bold text-white mt-10 shadow-lg">
            Add Category
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
