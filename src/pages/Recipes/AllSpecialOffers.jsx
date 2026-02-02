import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import useDataLoader from "../../hooks/useDataLoader";
import SpecialOfferDetails from "../../components/Shared/Recipes/SpecialOfferDetails";
import { Mosaic } from "react-loading-indicators";


export default function AllSpecialOffers() {
  const [specialOffers, setSpecialOffers] = useState([]);
const [cut, setCut] = useState(6);
  const [time, setTime] = useState(5000);

  const data = useDataLoader();
  useEffect(() => {
    data
      .get("/foodItems/SpecialOffer")
      .then((res) => setSpecialOffers(res.data));
  }, [time]);
  setTimeout(() => {
    if (specialOffers.length === 0) {
      setTime(0);
    }
    console.log(specialOffers);
  }, time);

  return (
    <section className="py-16 w-11/12 mx-auto lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-center font-bold text-[#ff9543] underline underline-offset-4 text-2xl lg:text-4xl mb-6 md:mb-12">
          Special Offers
        </h2>
        <p className=" md:mx-auto text-center md:text-lg text-gray-600 mx-auto  w-11/12  mb-10 md:mb-16">
          Save more & enjoy premium meals with our weekly discounts and
          exclusive deals.
        </p>
      </div>
{specialOffers.length === 0 && (
        <div className="flex mx-auto pt-32 pb-40 w-8 h-8 scale-60 lg:scale-80">
          <Mosaic
            color={[
              "#000000",
              "#475569",
              "#4b5563",
              "#52525b",
              "#404040",
              "#262626",
              "#1c1917",
            ]}
            size="small"
            text=""
            textColor=""
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {specialOffers.slice(0, cut).map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05, y: (index + 1) * 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.12 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden group md:mx-0"
          >
            <div className="relative z-0 h-48 overflow-hidden">
              <img
                src={offer.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {offer?.specialOffer?.badgeNote}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                {offer?.specialOffer?.title}
              </h3>
              <p className="text-gray-600 mb-4 ">
                {offer?.specialOffer?.description}
              </p>
              <SpecialOfferDetails
                id={offer._id}
                offer={offer.specialOffer}
              ></SpecialOfferDetails>
            </div>
          </motion.div>
        ))}
      </div> 
      {cut < specialOffers.length && (
        <div className=" flex justify-center mt-10 md:mt-20 overflow-y-hidden">
         
            <motion.button
              onClick={() => setCut(cut + 6)}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1 }}
              className=" border-2 bg-[#c7c7c711] cursor-pointer text-[#ff9543] border-[#ff9543] py-3 font-bold w-2/5 md:w-1/4 md:text-xl rounded-md"
            >
              See More
            </motion.button>
        
        </div>
      )}
    </section>
  );
}
