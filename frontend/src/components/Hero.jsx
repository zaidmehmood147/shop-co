import React from 'react';

const Hero = () => {
  return (
    <section className="bg-[#F2F0F1] overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-integral font-bold leading-[1.1]">
              FIND CLOTHES <br />
              THAT MATCHES <br />
              YOUR STYLE
            </h1>
            <p className="text-gray-600 text-base md:text-lg mt-4 max-w-md mx-auto lg:mx-0">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="bg-black text-white px-10 md:px-12 py-3 md:py-4 rounded-full mt-6 hover:bg-gray-800 transition w-full sm:w-auto text-base md:text-lg font-medium">
              Shop Now
            </button>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 mt-8 md:mt-10">
              <div>
                <p className="text-2xl md:text-3xl font-bold">200+</p>
                <p className="text-xs md:text-sm text-gray-500">International Brands</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              <div>
                <p className="text-2xl md:text-3xl font-bold">2,000+</p>
                <p className="text-xs md:text-sm text-gray-500">High-Quality Products</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              <div>
                <p className="text-2xl md:text-3xl font-bold">30,000+</p>
                <p className="text-xs md:text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Image - Properly Sized */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm md:max-w-md">
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