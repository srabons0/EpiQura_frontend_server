import { useState } from "react";
import photoUploader from "/assets/logo/photoUploader.PNG";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
const imageSecretKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${imageSecretKey}`

export default function ImageUploader({photo}) {

  const [images, setImages] = useState('');
  const { register, handleSubmit, reset } = useForm();
 

  
  const onSubmit = async(data) => {
    // console.log(event)
    // const file = data.image[0];
    // const file = {image: data.image[0]};
    // console.log(data,"file");
    // if (file) {
    // //   setImages(URL.createObjectURL(file));
    // } else {
    //   setImages(false);
    // }
  };
 const handleImageUpload = (event) => {
        // console.log(event)
        const file = event.target.files[0];
        // console.log(file)
        if (file) {
            setImages(URL.createObjectURL(file));
        }
        else {
            setImages(false)
        }
    };
 
  

  return (
    <div>
      <div className="w-2/3 flex items-center gap-5">
      <img
        className=" w-36 h-36 object-cover rounded-full transition duration-300 group-hover:scale-[1.03] border-[#666666] border-2"
        src={images ? images : photo ? photo : photoUploader}
        alt=""
      />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" relative flex items-center rounded-lg border-[#a9a9a9] border-2 justify-center w-40 h-10 cursor-pointer"
        >  
        <label className="text-lg font-bold ">Update Photo</label>
           <input
                   onInput={(e)=>{handleImageUpload(e); handleSubmit(onSubmit)}}
            className="bg-black w-full h-full absolute -top-0.5 left-0 opacity-5"
            {...register("image")}
            type="file"
            name="image"
            id=""
          />
       
          
        </motion.div>
      
      </div>
    </div>
  );
}
