"use client";

import { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
  titles: string[];
  descriptions: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images, titles, descriptions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 700);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div
      id="default-carousel"
      className="relative w-full h-auto flex flex-col justify-center items-center gap-4"
      data-carousel="slide"
    >
      <div className="w-full h-96 overflow-hidden rounded-lg m-4 hidden sm:block md:block">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-700 ease-in-out w-full justify-center ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="block object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4 p-8 h-64">
        <h2 className="text-2xl font-bold">
          {titles[currentIndex]}
        </h2>
        <p className="text-lg text-gray-500 mt-2 p-10 mb-10">
          {descriptions[currentIndex]}
        </p>
      </div>

      <div className="flex space-x-3 mt-16 justify-center items-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-300 w-5 h-5" : "bg-gray-300"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
