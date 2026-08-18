import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandCarousel from '../components/BrandCarousel';
import ProductSection from '../components/ProductSection';
import DressStyle from '../components/DressStyle';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BrandCarousel />
      <ProductSection 
        title="NEW ARRIVALS" 
        viewAll={true} 
        filter="isNewArrival=true&limit=4"
        link="/new-arrivals"
      />
      <ProductSection 
        title="TOP SELLING" 
        viewAll={true} 
        filter="isTopSelling=true&limit=4"
        link="/top-selling"
      />
      <DressStyle />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;