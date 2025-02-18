import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    caption: "Coupe Tendance",
  },
  {
    url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    caption: "Coloration",
  },
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    caption: "Coiffure de Mariage",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-lg aspect-[16/9] relative">
        {images.map((image, index) => (
          <div key={index} className={`absolute w-full h-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
            <img src={image.url} alt={image.caption} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <p className="text-lg font-semibold">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
