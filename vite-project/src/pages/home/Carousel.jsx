import React from "react";
import { Carousel } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export function CarouselCustomNavigation() {
  const location = useLocation();
  const isShopPage = location.pathname === "/shop";

  const singleImage = (
    <img
      src="/media/images/banner-33.jpg.png"
      alt="Single Slide"
      className="h-[320px] mx-auto sm:h-[500px] md:h-[400px] w-3/4 object-cover"
    />
  );

  const fullCarousel = (
    <Carousel
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
      className="max-h-[320px] sm:max-h-[400px] md:max-h-[500px] w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="/media/images/slider-01.jpg.png"
        alt="image 1"
        className="h-[320px] sm:h-[400px] md:h-[500px] w-full object-cover"
      />
      <img
        src="/media/images/elements01.png"
        alt="image 2"
        className="h-[320px] sm:h-[400px] md:h-[500px] w-full object-cover"
      />
      <img
        src="/media/images/slider-03.jpg.png"
        alt="image 3"
        className="h-[320px] sm:h-[400px] md:h-[500px] w-full object-cover"
      />
    </Carousel>
  );

  return (
    <div className="relative w-full max-w-full">
      {/* Overlay Text */}
      <div className="absolute z-30 top-[10%] md:top-[15%] left-4 md:left-[10%] lg:left-[15%] xl:left-[20%] text-left text-white w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] space-y-3 md:space-y-4">
        <div className="bg-gradient-to-r from-green-200 to-transparent p-1.5 md:p-3 inline-block rounded">
          <h3 className="text-xs md:text-sm font-semibold text-green-700 bg-clip-text">
            Weekend Discount
          </h3>
        </div>

        <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-purple-700 leading-snug md:leading-tight">
          Get the best quality <br />
          products at the lowest <br />
          prices
        </h1>

        <p className="text-black text-xs sm:text-sm md:text-base w-full">
          We have prepared special discounts for you on grocery products.
          Don't miss these opportunities...
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <button className="bg-purple-700 text-white px-5 sm:px-8 py-2 rounded font-medium text-sm sm:text-base hover:bg-purple-800 transition">
            Shop Now
          </button>

          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg sm:text-xl font-semibold">
              $27.99
            </span>
            <span className="line-through text-sm text-gray-800">
              $56.67
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm md:text-xs">
          Don't miss this limited time offer.
        </p>
      </div>

      {/* Conditional Carousel or Image */}
      {isShopPage ? singleImage : fullCarousel}
    </div>
  );
}
