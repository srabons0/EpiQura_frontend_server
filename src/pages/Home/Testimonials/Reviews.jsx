import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Pagination, FreeMode, Navigation } from "swiper/modules";
import useDataLoader from "../../../hooks/useDataLoader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
   const [time, setTime] = useState(5000);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/review").then((res) => setReviews(res.data));
   }, [time]);
  setTimeout(() => {
    if (reviews.length === 0) {
      setTime(0);
    }
    // console.log(testimonials);
  }, time);

  return (
    <section className="min-h-screen bg-gray-50 py-6 lg:hidden">
      {/* Header */}
      <div className="text-center px-4 mb-6">
        <h2 className="text-3xl font-bold text-orange-500 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-sm">
          Real reviews from real customers. Taste the love!
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        freeMode={true}
        navigation={true}
        modules={[Pagination, FreeMode, Navigation]}
        className="w-full h-[calc(100vh-150px)] px-4"
      >
        {reviews.map((slide) => (
          <SwiperSlide key={slide._id} className="flex justify-center items-center">
            <div className="flex flex-col justify-between bg-white rounded-3xl p-6 shadow-2xl w-11/12 max-w-sm h-full">
              
              {/* Rating & Verified */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">
                    {'⭐'.repeat(Math.round(slide.rating))}
                  </span>
                  <span className="text-gray-500 text-sm">{slide.rating.toFixed(1)}</span>
                </div>
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  Verified
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-7">
                {slide.description}
              </p>

              {/* Pros / Cons */}
              <div className="flex flex-col gap-2 mb-4 text-xs text-gray-600">
                <p className="flex items-start gap-1">
                  <span className="text-green-500">👍</span>
                  <span>
                    <span className="font-semibold text-gray-800">Pros:</span> {slide.pros}
                  </span>
                </p>
                <p className="flex items-start gap-1">
                  <span className="text-red-500">👎</span>
                  <span>
                    <span className="font-semibold text-gray-800">Cons:</span> {slide.cons}
                  </span>
                </p>
              </div>

              {/* Footer: Avatar + Name + Date */}
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800 text-sm">{slide.name}</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(slide.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom CTA */}
      <div className="mt-6 text-center px-4">
        <p className="text-gray-600 text-sm mb-2">Want to share your experience?</p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
          Leave a Review
        </button>
      </div>
    </section>
  );
};

export default Reviews;
