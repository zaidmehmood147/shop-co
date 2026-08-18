import React from 'react';

const Hero = () => {
  return (
    <section className="bg-[#F2F0F1] overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-integral font-bold leading-[1.1]">
              FIND CLOTHES <br className="hidden xs:block" />
              THAT MATCHES <br className="hidden xs:block" />
              YOUR STYLE
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-4 max-w-md mx-auto lg:mx-0">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="bg-black text-white px-8 sm:px-10 md:px-12 py-3 md:py-4 rounded-full mt-6 hover:bg-gray-800 transition w-full sm:w-auto text-sm sm:text-base md:text-lg font-medium">
              Shop Now
            </button>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 md:gap-12 mt-6 sm:mt-8 md:mt-10">
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">200+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">International Brands</p>
              </div>
              <div className="hidden sm:block w-px h-10 sm:h-12 bg-gray-300" />
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">2,000+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">High-Quality Products</p>
              </div>
              <div className="hidden sm:block w-px h-10 sm:h-12 bg-gray-300" />
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold">30,000+</p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src="/images/hero.jpg"
                alt="Fashion Model"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;