import { motion } from "framer-motion";
import useDataLoader from "../../hooks/useDataLoader";
import { useEffect, useState } from "react";
import SpecialOfferDetails from "../../components/Shared/Recipes/SpecialOfferDetails";

export default function SpecialOffers() {
  const [specialOffers, setSpecialOffers] = useState([]);

  const data = useDataLoader();
  useEffect(() => {
    data
      .get("/foodItems/SpecialOffer")
      .then((res) => setSpecialOffers(res.data));
  }, [data]);

  return (
    <section className="py-16 px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#ff9543]">
          Special Offers
        </h2>
        <p className="text-gray-600 text-lg">
          Save more & enjoy premium meals with our weekly discounts and
          exclusive deals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {specialOffers.slice(0, 3).map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05, y: (index + 1) * 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.12 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden group mx-5 md:mx-0"
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
    </section>
  );
}
