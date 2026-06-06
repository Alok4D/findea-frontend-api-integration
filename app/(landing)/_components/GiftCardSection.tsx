import Image from 'next/image';

const GiftCardSection = () => {
  return (
    <section className="w-full bg-[#F5F3EE] py-16 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto flex flex-col md:relative md:h-[600px] items-center justify-center">
        
        {/* Images Container */}
        <div className="relative w-full h-[230px] md:h-full md:absolute md:inset-0 mb-8 md:mb-0">
          {/* Left side image */}
          <div className="absolute left-0 top-0 w-[60%] md:w-[55%] h-[180px] md:h-[80%] border-[6px] md:border-10 border-white shadow-xl z-10">
            <Image
              src="/gift-img/Rectangle 4464.png"
              alt="Findea Gift Card Left"
              fill
              className="hidden md:block"
              draggable={false}
              priority
            />
            <Image
              src="/gift-img/gitt-small-device-left.png"
              alt="Findea Gift Card Left Mobile"
              fill
              className="object-cover md:hidden"
               draggable={false}
              priority
            />
          </div>

          {/* Right side image */}
          <div className="absolute right-0 top-16 md:top-auto md:bottom-0 w-[60%] md:w-[55%] h-[180px] md:h-[80%] border-[6px] md:border-10 border-white shadow-xl z-20">
            <Image
              src="/gift-img/Rectangle 4479.png"
              alt="Findea Gift Card Right"
              fill
              className="hidden md:block"
              draggable={false}
              priority
            />
            <Image
              src="/gift-img/gitt-small-device-right.png"
              alt="Findea Gift Card Right Mobile"
              fill
              className="object-cover md:hidden"
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Text Content block */}
        <div className="relative z-30 w-full max-w-md py-6 md:py-12 px-4 md:px-8 md:bg-brand-beige/50 md:backdrop-blur-sm md:border md:border-white/20 text-center md:shadow-xl">
          <h2 className="text-3xl md:text-[32px] font-semibold font-playfair text-brand-text mb-4">
            Offrez la liberté du choix
          </h2>
          <p className="text-[20px] md:text-[20px] font-medium font-playfair text-brand-text mb-8">
            Findea Gift Card
          </p>
          <button className="bg-[#F1E1C2] text-brand-text px-10 py-3 text-[20px] font-medium font-playfair transition-all shadow-sm">
            Send A Gift Card
          </button>
        </div>

      </div>
    </section>
  );
};

export default GiftCardSection;