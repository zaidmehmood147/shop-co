import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    comment: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    comment: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: 'Mooen',
    rating: 5,
    comment: "The checkout was smooth and delivery arrived two days early. The fit guide was spot on, which almost never happens when I shop online.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getItemsToShow = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [itemsToShow, setItemsToShow] = useState(getItemsToShow());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsToShow);
  const maxIndex = totalSlides - 1;

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsToShow;
    return testimonials.slice(start, start + itemsToShow);
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-integral font-bold text-center sm:text-left">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button
            onClick={goToPrev}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm disabled:opacity-50"
            disabled={isTransitioning}
            aria-label="Previous testimonials"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm disabled:opacity-50"
            disabled={isTransitioning}
            aria-label="Next testimonials"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-300 ease-in-out">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition min-h-[180px] flex flex-col">
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm md:text-base">
                    {i < testimonial.rating ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm md:text-base">{testimonial.name}</span>
                <span className="text-green-500 text-sm">✓</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 300);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;