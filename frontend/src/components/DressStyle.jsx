import React from 'react';
import { Link } from 'react-router-dom';

const styles = [
  { name: 'Casual', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600', slug: 'casual' },
  { name: 'Formal', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', slug: 'formal' },
  { name: 'Party', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600', slug: 'party' },
  { name: 'Gym', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600', slug: 'gym' },
];

const DressStyle = () => {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="bg-[#F0F0F0] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-integral font-bold text-center mb-6 sm:mb-8">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Link
            to="/category/casual"
            className="relative rounded-xl overflow-hidden cursor-pointer group col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <img
              src={styles[0].image}
              alt="Casual"
              className="w-full h-48 sm:h-56 md:h-72 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Casual</h3>
            </div>
          </Link>

          <Link
            to="/category/formal"
            className="relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={styles[1].image}
              alt="Formal"
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Formal</h3>
            </div>
          </Link>

          <Link
            to="/category/party"
            className="relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={styles[2].image}
              alt="Party"
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Party</h3>
            </div>
          </Link>

          <Link
            to="/category/gym"
            className="relative rounded-xl overflow-hidden cursor-pointer group col-span-2 lg:col-span-2"
          >
            <img
              src={styles[3].image}
              alt="Gym"
              className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl">Gym</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;