import React from 'react';

const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

const BrandCarousel = () => {
  return (
    <section className="bg-black py-6 md:py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={index}
                className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl px-6 sm:px-8 md:px-10"
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