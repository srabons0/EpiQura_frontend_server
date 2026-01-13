
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryData from "../../components/Shared/CategoryData";

const Categories = () => {
  const categories = CategoryData();
  // console.log(categories)
  return (
    <div>
      <p className="text-center text-xl md:text-3xl font-bold text-[#ff9543] underline underline-offset-8 my-10">
        Explore All Categories
      </p>
      <p className="mx-5 md:mx-auto text-center md:text-xl md:w-6/12 font-semibold text-black  my-10">
       Discover a variety of delicious dishes at your fingertips! From favorites to must-try items, explore and satisfy your cravings.
      </p>
      <Marquee
        className="flex"
        speed={80}
        linearColor="#fff"
        pauseOnHover={true}
        linearWidth={100}
        linear={true}
      >
        {categories.map((data, idx) => (
          <Link
            to={`/recipes/${data.name}`}
            key={idx}
            className=" flex 
                    flex-col items-center gap-2 justify-center font-semibold text-lg"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-18 h-18 md:w-40 md:h-40 ms-2 md:ms-5 mt-5 rounded-full"
              src={data.img}
            />
            <p>{data.name}</p>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default Categories;
