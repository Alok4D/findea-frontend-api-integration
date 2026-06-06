'use client';

import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ProductGridLanding = () => {
  const products = [
    
    {
      name: "Ajami Njoya",
      brand: "Ateliers Ifé",
      price: "CFA 22,500",
      image: "/product-img/Rectangle 4448 (10).png",
    },
    {
      name: "Ajami Njoya",
      brand: "Ateliers Ifé",
      price: "CFA 22,500",
      image: "/product-img/Rectangle 4448 (11).png",
    },
    {
      name: "Ajami Njoya",
      brand: "Ateliers Ifé",
      price: "CFA 22,500",
      image: "/product-img/Rectangle 4448 (12).png",
    },
    {
      name: "Ajami Njoya",
      brand: "Ateliers Ifé",
      price: "CFA 22,500",
      image: "/product-img/Rectangle 4448 (13).png",
    },
    {
      name: "Classic Leather Tote",
      brand: "Maison Elegance",
      price: "CFA 85,000",
      image: "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Minimalist Chrono",
      brand: "Chrono Styles",
      price: "CFA 110,000",
      image: "https://plus.unsplash.com/premium_photo-1728324765205-289d852f3442?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Velvet Evening Clutch",
      brand: "Velvet & Co.",
      price: "CFA 30,000",
      image: "https://images.unsplash.com/photo-1546454272-5914d75c01e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Midnight Jasmine",
      brand: "Warmth & Wick",
      price: "CFA 8,500",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Artisan Silk Scarf",
      brand: "Loom & Thread",
      price: "CFA 12,500",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Hydrating Facial Serum",
      brand: "Glow Rituals",
      price: "CFA 22,000",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Signature Tote Bag",
      brand: "Ateliers Ifé",
      price: "CFA 55,500",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);

  return (
    <section className="w-full bg-[#F5F3EE] py-20 md:py-[82px] px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header: Title and See All link */}
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-[25px] md:text-[32px] font-playfair text-brand-text font-bold uppercase">
            ACTUELLEMENT ADORÉ SUR FINDÉA
          </h2>
          <a
            href="#"
            className="text-md md:text-[24px] hidden md:block font-playfair font-semibold text-brand-text hover:opacity-60 transition-opacity"
          >
            See All
          </a>
        </div>

        {/* Product Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-6">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%] pl-6"
              >
                <div className="flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="transition-transform duration-500 hover:scale-105 object-cover"
                      draggable={false}
                      priority

                    />
                  </div>

                  {/* Product Info Box */}
                  <div className="bg-brand-beige py-6 px-4 text-center flex-grow">
                    <h3 className="text-[20px] font-playfair font-medium text-brand-text mb-1 uppercase">
                      {product.name}
                    </h3>
                    <p className="text-[16px] font-playfair text-brand-text mb-2">
                      {product.brand}
                    </p>
                    <p className="text-[16px] font-playfair text-brand-text font-medium">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGridLanding;
