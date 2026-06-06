"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { ChevronLeft } from "lucide-react";
import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";

const AboutPage = () => {
  
  const router = useRouter();

  return (
    <main className="min-h-screen">
      <LandingTopAnnouncementBar />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[174px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/about-img/Rectangle 4487 copy.png"
          alt="About Hero"
          fill
          draggable={false}
          priority
        />
        <button
          onClick={() => router.back()}
          className="absolute top-20 md:top-25 right-6 md:right-35 z-20 hidden lg:flex items-center gap-1 text-[#FFFFFF] text-[10px] md:text-sm font-inter hover:opacity-70 transition-opacity font-regular tracking-wider"
        >
          <ChevronLeft size={14} color="#FFFFFF" strokeWidth={1.5} className="md:w-4 md:h-4" />
          Return to previous page
        </button>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-[38px] text-[#FFFFFF] font-bold font-playfair tracking-widest uppercase py-4">
            À PROPOS DE NOUS
          </h1>
        </div>
      </section>

      {/* Who are we Section */}
      <section className="w-full bg-brand-main">
        <div className="max-w-[1240px] mx-auto py-12 md:py-20 px-6 md:px-12 lg:px-16 xl:px-0 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">

          <div className="relative h-[350px] md:h-[400px] lg:h-[500px] w-full order-2 md:order-1">
            <Image
              src="/about-img/Rectangle 4480.png"
              alt="Who we are"
              fill
              draggable={false}
              className="object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-5 lg:gap-8 order-1 md:order-2">
            <h2 className="text-3xl md:text-[30px] lg:text-[36px] font-playfair text-brand-text font-bold uppercase tracking-wider">
              Qui sommes-nous
            </h2>
            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-base lg:text-lg text-brand-text-secondary font-playfair leading-relaxed">
              <p>
                Findéa est née d’un constat simple : à Abidjan, les talents sont partout, mais ils sont souvent difficiles à trouver. Des boutiques confidentielles, des artisans passionnés, des créateurs inspirés, des prestataires de confiance… Autant de belles adresses qui méritent d’être vues, connues et accessibles plus facilement.
              </p>
              <p>
                Findéa a été imaginée comme un point de rencontre. Un espace où l’on prend le temps de chercher, de découvrir, de comparer et de choisir avec intention. Un lieu digital où chaque produit et chaque service raconte quelque chose, et où chaque professionnel trouve sa place.
              </p>
            </div>
            <button className="self-start font-playfair bg-[#F1E1C2] text-black px-6 md:px-8 py-2 md:py-2.5 text-lg lg:text-[20px] font-bold hover:bg-[#e5d8c1] transition-all tracking-wide uppercase">
              Contact Us
            </button>
          </div>
        </div>
      </section>


      {/* Meeting Point Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-main">
        <div className="max-w-[1239px] mx-auto text-center">
          <h2 className="text-2xl md:text-[30px] lg:text-[36px] font-playfair font-semibold text-brand-text uppercase mb-10 lg:mb-16">
            Findéa, un point de rencontre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8">
            {[
              {
                title: "Découvrir",
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070",
              },
              {
                title: "Comparer",
                img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070",
              },
              {
                title: "Choisir",
                img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2070",
              },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col gap-4 ${i === 2 ? 'sm:col-span-2 md:col-span-1 lg:col-span-1' : ''}`}>
                <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden cursor-pointer">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    draggable={false}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold font-playfair text-[#1A1A1A] uppercase mt-[21px] md:mt-4">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section className="bg-brand-greige min-h-[400px] md:min-h-[446px] flex items-center justify-center px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-[1240px] mx-auto text-center font-playfair">

          {/* Main Body Text */}
          <div className="text-brand-text text-base md:text-xl lg:text-[24px] font-regular leading-[1.6] md:leading-relaxed space-y-8 md:space-y-0 mb-10 md:mb-12 tracking-wide">
            <p>
              Que L&apos;on Cherche Un Objet Pour Son Intérieur, Un Cadeau Chargé De Sens, Une Piece Pour Une Liste De Mariage Ou De Naissance, Ou Encore Un Service Du Quotidien, Findéa Accompagne Chaque Étape, Simplement Et Naturellement.
            </p>
            <p>
              Nous Avons Voulu Une Plateforme Douce Et Intuitive, À L&apos;image De La Ville Qu&apos;elle Met En Lumiere. Une Expérience Fluide, Esthétique Et Chaleureuse, Pensée Autant Pour Ceux Qui Découvrent Que Pour Ceux Qui Proposent.
            </p>
          </div>

          {/* Highlighted Footer Line */}
          <div className="pt-4">
            <p className="text-brand-text text-lg md:text-xl lg:text-[24px] font-semibold">
              Findéa Ne Vend Pas Seulement Des Produits Ou Des Services. Elle Crée Des Liens.
            </p>
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-brand-main">
        <div className="max-w-[1239px] mx-auto text-center">
          <h2 className="text-3xl lg:text-[36px] font-playfair font-semibold text-brand-text uppercase mb-12 lg:mb-20">
            Valeurs de Findéa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {[
              {
                icon: "/about-img/Vector (1).png",
                title: "Authenticité",
                desc: "Sélection soignée et de qualité",
              },
              {
                icon: "/about-img/Vector (2).png",
                title: "Communauté",
                desc: "Liens durables avec les créateurs locaux",
              },
              {
                icon: "/about-img/Vector (3).png",
                title: "Durabilité",
                desc: "Pratiques responsables et commerce local",
              },
            ].map((value, i) => (
              <div
                key={i}
                className={`bg-brand-beige p-8 md:p-10 lg:p-12 h-[273px] justify-center items-center flex flex-col transition-all hover:shadow-sm ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex justify-center mb-6 md:mb-8">
                  <Image src={value.icon}
                  draggable={false}
                  alt={value.title} width={40} height={40}  className="text-brand-text md:w-12 md:h-12" />
                </div>
                <h3 className="text-lg md:text-xl font-playfair text-brand-text uppercase font-medium mb-3 md:mb-4">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-brand-text-secondary font-playfair max-w-[168px] mx-auto">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* newsletterSection */}
      <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-img/Frame 60.png"
            alt="Newsletter Background"
            fill
            draggable={false}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-[#FFFFFF]">
          <h2 className="text-[24px] md:text-[32px] lg:text-[40px] font-playfair font-semibold uppercase tracking-widest mb-4">
            Entrez dans notre univers
          </h2>

          <p className="text-base lg:text-[20px] font-medium font-playfair mb-10">
            Découvrez En Avant-Première Nos Nouvelles Collections Et Nos Trésors Exclusifs.
          </p>

          {/* Subscription Form */}
          <form className="flex flex-row items-center justify-center gap-2 md:gap-4 mx-auto w-full max-w-sm md:max-w-none">
            <div className="flex-1 md:w-96 md:flex-none">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent border border-[#F1E1C2] py-2 md:py-3 px-3 md:px-4 text-white placeholder:text-white/70 focus:outline-none focus:border-white transition-colors font-inter text-sm md:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#F1E1C2] text-black px-5 md:px-10 py-2 md:py-3 md:text-[19px] text-sm font-bold hover:bg-[#e5d8c1] transition-all tracking-wide shadow-lg font-playfair whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AboutPage;
