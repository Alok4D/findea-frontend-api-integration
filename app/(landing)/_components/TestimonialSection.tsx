'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Samantha D.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"I absolutely love the curated collection! The attention to detail in every piece is remarkable. It\'s become my favorite place to find items."'
    },
    {
      name: 'Michael R.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"The quality of the products exceeded my expectations. Customer service was also very helpful throughout the process. Highly recommended!"'
    },
    {
      name: 'Elena G.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"Finding authentic local talents has never been easier. I love how this platform connects us with creators who truly care about their craft."'
    },
    {
      name: 'David L.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"A seamless experience from browsing to delivery. The premium feel of the website matches the premium quality of the products perfectly."'
    },
    {
      name: 'Sarah K.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"The attention to detail in the packaging alone is impressive. You can tell they really value  and the brands they represent."'
    },
    {
      name: 'James W.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"Everything I have ordered so far has been top-notch. The site is easy to navigate and the delivery is fast even for delicate items."'
    },
    {
      name: 'Olivia M.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"I love the diversity of artists featured here. It\'s not just a store; it feels like a community that celebrates creativity and craftsmanship."'
    },
    {
      name: 'Lucas P.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150',
      review: '"Finally a platform that filters the noise and brings only the best quality services and products. Highly satisfied with my recent purchase!"'
    }
  ];

  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-20 overflow-hidden bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-[28px] md:text-[32px] font-bold font-playfair text-brand-text mb-16 uppercase">
          <span className="md:hidden italic font-bold font-playfair">CUSTOMER FEEDBACK</span>
          <span className="hidden md:block">WORDS FROM OUR COMMUNITY</span>
        </h2>

        {/* Testimonials Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-6">
            {testimonials.map((item, index) => (
              <div 
                key={index} 
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%] pl-6"
              >
                <div className="bg-brand-beige p-8 h-full flex flex-col items-center text-center shadow-xs border-t-4 border-[#1A1A1A] hover:bg-[#D9D7CB] transition-colors duration-300">
                  {/* Profile Image (Circular) */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      draggable={false}
                      priority
                    />
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#E47F0C" stroke="#E47F0C" />
                    ))}
                  </div>

                  {/* User Name */}
                  <h3 className="text-[22px] font-manrope font-bold text-brand-text mb-3 tracking-tight">
                    {item.name}
                  </h3>

                  {/* Review Text */}
                  <p className="text-[13.5px] font-inter text-brand-text-secondary leading-relaxed">
                    {item.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;