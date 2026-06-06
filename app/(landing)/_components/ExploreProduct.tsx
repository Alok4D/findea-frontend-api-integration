
import Image from 'next/image';

const ExploreProduct = () => {
  return (
    <section className="w-full bg-[#F5F3F0] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left side content (1/3 part) */}
        <div className="w-full lg:w-[36%] flex flex-col items-start">
          <h2 className="text-[22px] md:text-[32px] font-playfair text-brand-text mb-6 uppercase tracking-wide">
            BOUTIQUES & CRÉATEURS
          </h2>
          <p className="text-[16px] font-playfair text-[#4A4A4A] leading-relaxed mb-8">
            Découvrez des boutiques soigneusement sélectionnées, où des créations uniques, un savoir-faire délicat et un design intemporel se rencontrent pour raconter de magnifiques histoires.
          </p>
          <button className="bg-[#F1E1C2] text-black px-8 py-3 text-[18px] font-playfair font-medium hover:bg-[#e5d8c1] transition-all shadow-sm">
            Explore Boutique
          </button>
        </div>

        {/* Right side image grid (2/3 part) */}
        <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Boutique Card */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[315px] overflow-hidden mb-4">
              <Image
                src="/blog-img/image.png"
                alt="Boutique"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-playfair text-[#1A1A1A]">Boutique</span>
          </div>

          {/* Creators Card */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[315px] overflow-hidden mb-4">
              <Image
                src="/banner-img/Gemini_Generated_Image_2tv8hi2tv8hi2tv8.png"
                alt="Creators"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-playfair text-[#1A1A1A]">Creators</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExploreProduct;