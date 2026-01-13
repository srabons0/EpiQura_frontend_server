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
  const dataloader = useDataLoader();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [selectCategory, categoryIsPending, categoryRefetch] = useLoader(
    "category",
    `/category`
  );
  const onSubmit = async (data) => {
   
    if(data.price <= 0 || data.cookingTime <=0){
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
    <div className="py-10 bg-[#dbdbdb1e]">
      <div className="w-10/12 mx-auto border-4 p-10 rounded-lg  border-[#282828] bg-[#f8b44d]  text-white">
        <p className="text-4xl text-center mb-10 font-bold  underline underline-offset-4">
          Add Your Recipe
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center gap-10">
            <div className="w-2/3">
              <label className="text-lg font-bold ">Recipe Name</label>
              <input
                className="input placeholder:text-lg  rounded-lg shadow-lg text-lg font-semibold input-bordered mt-3 mb-4 w-full
                             bg-[#ffffff19] border-[#ffffff] border-2 placeholder:text-white"
                placeholder="Name"
                required
                {...register("name")}
              />

              <label className="text-lg font-bold ">Price</label>
              <input
                className="input placeholder:text-lg  rounded-lg shadow-lg text-lg font-semibold input-bordered mt-3 mb-4 w-full 
                            bg-[#ffffff19] border-[#ffffff] border-2 placeholder:text-white"
                placeholder="Price"
                type="number"
                step="0.01"
                required
                {...register("price")}
              />

              <label className="text-lg font-bold ">Cooking Time</label>
              <input
                className="input placeholder:text-lg text-lg font-semibold input-bordered mt-3 mb-4  rounded-lg shadow-lg w-full 
                            bg-[#ffffff19] border-[#ffffff] border-2 placeholder:text-white"
                placeholder="Cooking Time"
                type="number"
                required
                {...register("cookingTime")}
              />
              

              <label className="text-lg font-bold ">Choose Your Category</label>
              <select
                defaultValue="default"
                className="select rounded-lg shadow-lg select-bordered text-lg font-semibold mb-4 mt-3
                             w-full bg-[#f8b44d] text-white border-[#ffffff] border-2 placeholder:text-white"
                required
                {...register("category")}
              >
                <option disabled value="default">
                  Choose Category
                </option>

                {selectCategory.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="text-lg font-bold ">
                Specialty Sections (If you have)
              </label>
              <select
                defaultValue="default"
                className="select rounded-lg shadow-lg select-bordered text-lg font-semibold mb-4 mt-3
                             w-full bg-[#f8b44d] text-white border-[#ffffff] border-2 placeholder:text-white"
                required
                {...register("menuSection")}
              >
                <option disabled value="default">
                  Menu Section Category
                </option>

                <option value="Regular">Regular Dish</option>
                <option value="TopFood">Top Food</option>
                <option value="SpecialOffer">Special Offer</option>
                <option value="Popular">Popular</option>
              </select>
              {error && (
                <div className="text-lg font-semibold mb-3 mt-10 text-red-600">
                  {error}
                </div>
              )}
            </div>
            <div className="w-2/3 flex flex-col justify-center items-center gap-5">
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
                Upload Your Recipe Photo Here
              </label>
              <div className="w-full mt-4 flex flex-col justify-start items-start">
                <label className="text-lg font-bold ">Additional Note</label>
                <input
                  className="input placeholder:text-lg text-lg font-semibold input-bordered w-full mb-4 mt-3 rounded-lg shadow-lg  
                             bg-[#ffffff19] border-[#ffffff] border-2 placeholder:text-white"
                  placeholder="optional"
                  {...register("additionalNote")}
                />

                <label className="text-lg font-bold ">Ingredients</label>
                <textarea
                  className="textarea textarea-bordered text-lg font-semibold mt-3 w-full h-28 rounded-lg shadow-lg placeholder:text-lg bg-[#ffffff19] 
                  border-[#ffffff] border-2 placeholder:text-white"
                  placeholder="Ingredients"
                  required
                  name=""
                  id=""
                  {...register("ingredients")}
                ></textarea>
              </div>
            </div>
          </div>

          <button className="border-[#ffffff] border-2 btn w-full bg-[#ffffff19] hover:border-[#ff8400ae] rounded-lg py-3 h-12 hover:bg-[#ffaa2b] text-lg font-bold text-white mt-10 shadow-lg">
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
