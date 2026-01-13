import { motion } from "framer-motion";

export default function SpecialOffers() {
  const offers = [
    {
      title: "Flat 25% OFF",
      desc: "Get 25% discount on all Fast Foods this week.",
      img: "/assets/food/Beef-stroganoff-with-rice-2.jpg",
      badge: "Limited Time",
    },
    {
      title: "Buy 1 Get 1 Free",
      desc: "Available on selected burgers & pizzas.",
      img: "/assets/food/79805-StuffedPeppersWithturkeyAndVegtables-MFS-2x3-0048-444ecb49b0184daab29e5326e4330af3.jpg",
      badge: "BOGO",
    },
    {
      title: "Free Delivery",
      desc: "Enjoy free delivery on orders above 500৳.",
      img: "/assets/food/mc-beef-wellington-superJumbo-v2.jpg",
      badge: "No Delivery Fee",
    },
  ];

  return (
    <section className="py-16 px-6">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4 text-[#ff9543]">Special Offers</h2>
        <p className="text-gray-600 text-lg">
          Save more & enjoy premium meals with our weekly discounts and exclusive deals.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0,scale:1.05, y: (index+1)*50 }}
            whileInView={{ opacity: 1,scale: 1, y: 0 }}
            transition={{ duration: 1, delay: index* .12 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden group mx-5 md:mx-0"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={offer.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {offer.badge}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.desc}</p>

              <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }} 
                        className="w-full py-2 bg-orange-400 hover:bg-[#fbb47d] text-white rounded-lg font-medium transition">
                Claim Offer
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
