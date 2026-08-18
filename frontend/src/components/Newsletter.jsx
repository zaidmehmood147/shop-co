import React from 'react';

const Newsletter = () => {
  return (
    <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
      <div className="bg-black rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <div>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-integral font-bold leading-tight text-center lg:text-left">
              STAY UP TO DATE <br className="hidden sm:block" />
              ABOUT OUR LATEST OFFERS
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-gray-700 outline-none text-sm sm:text-base"
            />
            <button className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;