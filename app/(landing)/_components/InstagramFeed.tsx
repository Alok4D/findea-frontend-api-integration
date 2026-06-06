import Image from 'next/image';

const InstagramFeed = () => {
  const feedImages = [
    { src: '/social-img/Rectangle 4467.png', rotate: '-rotate-0', translate: 'translate-y-5 md:translate-y-8', z: 'z-0' },
    { src: '/social-img/Rectangle 4468.png', rotate: 'rotate-0', translate: 'translate-y-2', z: 'z-10' },
    { src: '/social-img/Rectangle 4469.png', rotate: '-rotate-0', translate: '-translate-y-4 md:-translate-y-6', z: 'z-20' },
    { src: '/social-img/Rectangle 4470.png', rotate: 'rotate-0', translate: 'translate-y-2', z: 'z-10' },
    { src: '/social-img/Rectangle 4471.png', rotate: '-rotate-0', translate: 'translate-y-5 md:translate-y-8', z: 'z-0' },
  ];

  return (
    <section className="w-full bg-[#F5F3F0] py-15 md:py-24 px-4 overflow-hidden">
      <div className="max-w-[1240px] mx-auto text-center">
        
        {/* Header Title */}
        <div className="mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 md:gap-5 mb-0 md:mb-[-10px]">
            <span className="font-dancing text-[45px] md:text-[58px] text-brand-text leading-[1.7] py-2 font-bold">
              Let&apos;s
            </span>
            <h2 className="text-[45px] md:text-[64px] font-medium font-playfair text-brand-text tracking-tight uppercase leading-none">
              COLLECT
            </h2>
          </div>
          <p className="text-[30px] md:text-[42px] font-medium font-playfair text-brand-text tracking-tight uppercase leading-tight">
            ON INSTAGRAM
          </p>
        </div>

        {/* Scattered/Overlapping Image Feed */}
        <div className="flex justify-center items-center -space-x-8 sm:-space-x-12 md:-space-x-12 lg:-space-x-5 mb-20 lg:px-0 md:px-4 px-2 cursor-pointer">
          {feedImages.map((img, index) => (
            <div 
              key={index} 
              className={`relative w-24 sm:w-48 md:w-64 lg:w-[264px] aspect-square border-[3px] md:border-10 border-white shadow-xl md:shadow-2xl transition-all hover:scale-110 hover:z-30 
              ${img.rotate} ${img.translate} ${img.z} overflow-hidden`}
            >
              <Image
                src={img.src}
                alt={`Instagram feed ${index}`}
                fill
                className="object-cover"
                draggable={false}
                priority
              />
            </div>
          ))}
        </div>

        {/* Instagram Handle */}
        <p className="text-2xl md:text-[40px] text-brand-text font-playfair italic font-bold mb-10 tracking-wide">
          @username.here
        </p>

        {/* Follow Button */}
        <button className="bg-[#F1E1C2] font-playfair text-brand-text px-12 py-3 text-[20px] font-bold uppercase tracking-widest hover:bg-[#ebd9b6] transition-all border border-gray-400">
          FOLLOW US
        </button>

      </div>
    </section>
  );
};


export default InstagramFeed;