import Image from 'next/image';

const RegistrySection = () => {
  return (
    <section className="w-full bg-brand-beige flex flex-col md:flex-row min-h-[621px]">
      
     
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
        <h2 className="text-2xl md:text-[32px] font-playfair font-semibold text-brand-text leading-tight mb-8 uppercase tracking-wide">
          CREATE YOUR WEDDING OR <br /> BABY REGISTRY
        </h2>
        
        <p className="text-lg md:text-[22px] font-playfair text-brand-text-secondary mb-10 max-w-md">
          Créez une liste à partir de plusieurs boutiques sur Findéa, 
          partagez-la avec vos proches et laissez-la se mettre à jour automatiquement.
        </p>

       
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4">
          <button className="bg-[#F1E1C2] text-black px-2 md:px-8 py-3 text-sm sm:text-base md:text-[20px] font-playfair font-medium hover:bg-[#e5d8c1] transition-all shadow-sm">
            Create A Wedding List
          </button>
          <button className="bg-brand-text-secondary text-[#F1E1C2] px-2 md:px-8 py-3 text-sm sm:text-base md:text-[20px] font-playfair font-medium hover:bg-[#635f56] transition-all shadow-sm">
            Create A Baby Registry
          </button>
        </div>
      </div>

     
      <div className="w-full md:w-1/2 relative min-h-[400px]">
        <Image
          src="/about-img/Frame 1597881210.svg"
          // src="/blog-img/Frame 1597881210 copy.png"
          alt="Wedding Registry Decor"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default RegistrySection;