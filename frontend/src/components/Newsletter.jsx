import React from 'react';

const Newsletter = () => {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="bg-black rounded-3xl p-6 sm:p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-integral font-bold leading-tight text-center lg:text-left">
              STAY UP TO DATE <br className="hidden sm:block" />
              ABOUT OUR LATEST OFFERS
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-3 rounded-full bg-white text-gray-700 outline-none text-sm"
            />
            <button className="px-6 sm:px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;