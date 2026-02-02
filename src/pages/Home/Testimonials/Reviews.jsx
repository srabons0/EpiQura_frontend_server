import React, { useEffect, useState, useRef  } from "react";
import useDataLoader from "../../../hooks/useDataLoader";

import { Star, ThumbsUp, CheckCircle, XCircle, ArrowBigLeft, ArrowBigRight } from "lucide-react";
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

  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const [dragStart, setDragStart] = useState(null);

  const total = reviews.length;

  // Move 1 by 1
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  // Drag / Swipe
  const handleDragStart = (x) => setDragStart(x);

  const handleDragEnd = (x) => {
    if (dragStart === null) return;
    const diff = dragStart - x;

    if (diff > 30) nextSlide(); // swipe left
    else if (diff < -30) prevSlide(); // swipe right

    setDragStart(null);
  };

  return (
   <div className="sm:hidden bg-orange-100 py-15 flex flex-col items-center p-2">
      <h2 className="text-2xl font-bold text-[#ff9543] mb-6">Customer Reviews</h2>

      <div className="relative w-full max-w-md overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 cursor-grab"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          {reviews.map((slide, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full px-2 flex justify-center"
            >
              <div className="flex flex-col items-start bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
                <div className="flex gap-3 relative w-full">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={slide.img}
                    alt={slide.name}
                  />
                  <div className="flex-1 flex flex-col">
                    <p className="font-semibold text-gray-900">{slide.name}</p>
                   <div className="text-xs text-gray-500 mt-1">
                      <p>{slide.email}</p>
                      <p>{new Date(slide.date).toLocaleDateString()}</p>
                    </div>
                  </div> 
                  
                </div>

                <div className="mt-3 w-full">
                  <p className="font-semibold text-gray-900 mb-1">{slide.title}</p>
                  <p className="text-sm  text-gray-700 h-23 overflow-y-auto">{slide.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900">{slide.dish}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{slide.rating}</span>
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-3 gap-1 w-full">
                  <p className="text-xs text-gray-700">
                    <span className="text-sm font-semibold text-gray-900">Highlights:</span>{" "}
                    {slide.pros}
                  </p>
                  <p className="text-xs text-gray-700">
                    <span className="text-sm font-semibold text-gray-900">Downsides:</span>{" "}
                    {slide.cons}
                  </p>
                </div>

                <div className="relative w-full h-12">{slide.recommend && (
                    <p className="text-white text-xs bg-green-600/60 px-2 py-1.5 rounded-4xl absolute right-0 mt-5 text-right font-semibold">
                      Recommended
                    </p>
                  )}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow text-orange-500"
        >
          <ArrowBigLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow text-orange-500"
        >
          <ArrowBigRight size={20} / >
        </button>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {reviews.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              current === i ? "bg-orange-700" : "bg-orange-400/60"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
