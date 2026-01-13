import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./styles.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { EffectCoverflow, FreeMode, Pagination } from "swiper/modules";
import useDataLoader from "../../../hooks/useDataLoader";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const data = useDataLoader();
  useEffect(() => {
    data.get("/review").then((res) => setTestimonials(res.data));
  }, [data]);

  // console.log(testimonials);

  const swiperRef = useRef();

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.slides) return;
    // if (!swiperRef.current) return;

    swiperRef.current.slides.forEach((slide, index) => {
      slide.style.transition = "all 0.3s ease-in-out 0.2s";
      if (index === swiperRef.current.activeIndex) {
        slide.style.transform = "scale(1.23)";
        // slide.style.filter = "blur(0)";
        slide.style.marginTop= "40px";

      } else {
        slide.style.top = "40px";
        slide.style.transform = "scale(0.9)";
        // slide.style.filter = "blur(1.5px)";
      }
    });
  };

  return (
    <section className=" py-16 mt-20">
      <div className="max-w-full mx-auto  px-4 text-center ">
        {/* <img className="w-1/6 mx-auto mb-5" src={testimonialsQuote} alt="" /> */}
        <h2 className="text-3xl md:text-4xl text-[#ff9543] font-bold ">
          Taste That Speaks for Itself
        </h2>
        <p className="text-center w-4/6 mx-auto  font-medium text-lg mt-6 ">
          Don’t take our word for it — here’s how our customers describe the flavors.
        </p>
      </div>
      <div className="mt-2 w-[1340px] mx-auto">
        <Swiper
          navigation={true}
          initialSlide={1}
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={true} // center the middle slide
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[FreeMode, Pagination, Navigation]}
          className="mySwiper h-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange(); // initial state
          }}
          onSlideChange={handleSlideChange}
        >
          {testimonials.map((slide, i) => (
            <SwiperSlide
              key={i}
              className="flex items-center justify-center bg-white rounded-2xl shadow-lg p-6 transition-all duration-300"
            >
              <div className="">
                <div className="flex gap-1 relative">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={slide.img}
                    alt=""
                  />
                  <div className="flex items-center  ">
                    <p className=" font-semibold text-black">{slide.name}</p>
                    <div className="text-right text-sm absolute right-0 font-semibold text-black">
                      <p>{slide.email}</p>
                      <p>{new Date(slide.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className=" font-semibold text-sm text-black mb-1">
                    {slide.title}
                  </p>
                  <p className="w-11/12 text-sm mb-3">{slide.description}</p>
                  <p className="">{slide.recommend}</p>
                  <div className="flex justify-between items-center">
                    <p className=" font-semibold text-black mt-2 mb-1">
                      {slide.tags}
                    </p>
                    <div className="flex text-sm gap-2">
                      {slide.rating}
                      <Rating
                        style={{ maxWidth: 80 }}
                        value={slide.rating}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-2 gap-1">
                  <p className="text-sm">
                    <span className="font-semibold text-black">
                      Highlights:
                    </span>{" "}
                    {slide.pros}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-black">
                      Downsides:
                    </span>{" "}
                    {slide.cons}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

{
  // <SwiperSlide className="" key={testimonials._id}>
  //                           <div className="mx-16">
  //                               <div className="flex gap-4 relative">
  //                                   <img className="w-16 h-[64px] rounded-full" src={testimonials.img} alt="" />
  //                                   <div className="flex items-center  ">
  //                                       <p className="text-xl font-semibold text-black">{testimonials.name}</p>
  //                                       <div className="text-right absolute right-0 font-semibold text-black">
  //                                           <p>{testimonials.email}</p>
  //                                           <p>{new Date(testimonials.date).toLocaleDateString()}</p>
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                               <div className="mt-6">
  //                                   <p className="text-xl font-semibold  text-black mb-2" >{testimonials.title}</p>
  //                                   <p className="w-11/12">{testimonials.description}</p>
  //                                   <p className="">{testimonials.recommend}</p>
  //                                   <div className="flex justify-between items-center">
  //                                   <p className="text-lg font-semibold text-black mt-4 mb-3">{testimonials.tags}</p>
  //                                   <div className="flex gap-2">{testimonials.rating}
  //                                   <Rating
  //                                    style={{ maxWidth: 100}}
  //                                   value={testimonials.rating} readOnly
  //                                   /></div>
  //                                   </div>
  //                                   </div>
  //                               <div className="flex flex-col mt-2 gap-1">
  //                                   <p className=""><span className="font-semibold text-black">Highlights:</span> {testimonials.pros}</p>
  //                                   <p className=""><span className="font-semibold text-black">Downsides:</span> {testimonials.cons}</p>
  //                               </div>
  //                           </div>
  //                       </SwiperSlide>
}

export default Testimonials;
