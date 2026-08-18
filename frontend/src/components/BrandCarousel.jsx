import React from 'react';

const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

const BrandCarousel = () => {
  return (
    <section className="bg-black py-4 sm:py-6 md:py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={index}
                className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-4 sm:px-6 md:px-8 lg:px-10"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;