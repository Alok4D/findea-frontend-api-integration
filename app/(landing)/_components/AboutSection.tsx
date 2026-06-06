import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="w-full bg-brand-main py-16 px-6 md:px-12 lg:px-16 xl:px-0">
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left side image grid (Overlap Layout) */}
        <div className="relative w-full lg:w-1/2 h-[500px] md:h-[600px]">
          {/* Main large image (Center) */}
          <div className="absolute inset-0 z-10 w-[85%] h-[85%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/banner-img/main-img.png"
              alt="Artisans"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>

          {/* Left small image (Overlap) */}
          <div className="absolute left-0 bottom-30 z-20 w-48 h-60 hidden md:block">
            <Image
              src="/banner-img/buttom-img.png"
              alt="Model"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>

          {/* Right small image (Overlap) */}
          <div className="absolute right-0 top-30 z-20 w-40 h-52 hidden md:block">
            <Image
              src="/banner-img/Gemini_Generated_Image_2tv8hi2tv8hi2tv8.png"
              // src="/banner-img/right-img.png"
              alt="Boutique"
              fill
              className="object-cover"
              draggable={false}
              priority
            />
          </div>
        </div>

        {/* Right side text content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h2 className="text-4xl md:text-5xl font-playfair text-brand-text mb-8">
            Qui sommes-nous
          </h2>
          
          <div className="space-y-6 text-brand-text-secondary leading-relaxed text-[16px] font-light max-w-xl">
            <p>
              Findéa est née d&apos;une envie simple : rassembler le beau, le sens
              et l&apos;humain en un seul lieu.
            </p>
            <p>
              Au cœur d&apos;Abidjan, entre créativité, chaleur et énergie locale,
              nous mettons en lumière des boutiques, des créateurs et des
              talents à travers des sélections choisies avec soin — produits,
              savoir-faire et services. Nous accompagnons aussi vos plus
              beaux moments de vie grâce à nos listes de mariage et de
              naissance, pensées comme de véritables expériences. Chaque
              découverte a une histoire, chaque détail a une intention.
            </p>
            <p className="font-medium">
              Plus qu&apos;une plateforme, Findéa est un espace d&apos;inspiration, de
              confiance et de découvertes.
            </p>
          </div>

          {/* Contact button */}
          <button className="mt-10 bg-[#F1E1C2] font-playfair font-medium text-black px-10 py-3 text-[20px]  hover:bg-[#e5d8c1] transition-all shadow-sm">
            Contact Us
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;