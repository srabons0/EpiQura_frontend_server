import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryData from "../../components/Shared/CategoryData";

const Categories = () => {
  const categories = CategoryData();
  // console.log(categories)
  return (
    <div className="w-full overflow-hidden">

      <p
        className="text-center text-lg sm:text-xl md:text-3xl 
                font-bold text-[#ff9543] 
                underline underline-offset-8 
                my-6 md:my-10"
      >
        Explore All Categories
      </p>
      <p
        className="
      mx-4 md:mx-auto 
      text-center 
      text-sm sm:text-base md:text-xl
      md:w-6/12 
      font-medium 
      text-black 
      mb-6 md:mb-10
    "
      >
        Discover a variety of delicious dishes at your fingertips! From
        favorites to must-try items, explore and satisfy your cravings.
      </p>

      <Marquee
        className="flex items-center"
        speed={60}
        gradient
        gradientColor={[255, 255, 255]}
        gradientWidth={80}
        linearColor="#fff"
        pauseOnHover={true}
        linearWidth={100}
        linear={true}
      >
        {categories.map((data, idx) => (
          <Link
            to={`/recipes/${data.name}`}
            key={idx}
            className="
          flex flex-col items-center justify-center
          gap-2 md:gap-3
          font-semibold
          text-sm md:text-lg
          mx-1 md:mx-2
        "
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={data.img}
              alt={data.name}
              className="
            w-20 h-20 sm:w-24 sm:h-24 
            md:w-36 md:h-36 
            rounded-full 
            object-cover
          "
            />
            <p className="text-center">{data.name}</p>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default Categories;
