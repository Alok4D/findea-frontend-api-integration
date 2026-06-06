'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Blog = () => {
  const categories = [
    { title: 'Produits', image: '/blog-img/Rectangle 4448.svg' },
    { title: 'Services', image: '/blog-img/Rectangle 4448 (1).svg' },
    { title: 'Boutiques', image: '/blog-img/Rectangle 4448 (2).png' },
    { title: 'Inspiration', image: '/blog-img/Rectangle 4448 (3).png' },
    { title: 'Produits', image: '/blog-img/Rectangle 4448.svg' },
    { title: 'Services', image: '/blog-img/Rectangle 4448 (1).svg' },
  ];

  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);

  return (
    <section className="w-full bg-brand-greige py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-[22px] md:text-[32px] font-semibold font-playfair text-brand-text tracking-wider mb-12 uppercase">
          PARCOUREZ AVEC INTENTION
        </h2>

        {/* Categories Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%] pl-6"
              >
                <div className="flex flex-col items-center">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden mb-4 shadow-sm">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      draggable={false}
                      priority
                    />
                  </div>
                  
                  {/* Category Label */}
                  <h3 className="text-lg font-playfair text-[#1A1A1A] tracking-wide font-medium">
                    {category.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;