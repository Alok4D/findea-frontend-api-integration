import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const LandingTopAnnouncementBar = () => {
  return (
    <header className="hidden md:block w-full bg-white">
      {/* Top Banner section */}
      <div className="w-full max-w-[1239px] mx-auto border-gray-100 bg-white py-2 px-4 md:px-10 flex items-center justify-between">
        <div className="hidden md:block flex-1"></div>

        <div className="flex-1 text-center">
          <span className="text-[10px] md:text-[13px] lg:text-[14px] xl:text-[16px] text-gray-800 font-normal">
            Free Shipping on all Orders over $250
          </span>
        </div>

        <div className="flex-1 flex justify-end items-center space-x-5">
          <a href="#" className="hover:opacity-60 transition-all">
            <Facebook size={18} strokeWidth={1.5} className="text-black" />
          </a>
          <a href="#" className="hover:opacity-60 transition-all">
            <Instagram size={18} strokeWidth={1.5} className="text-black" />
          </a>
          <a href="#" className="hover:opacity-60 transition-all">
            <Twitter size={18} strokeWidth={1.5} className="text-black" />
          </a>
          <a href="#" className="hover:opacity-60 transition-all">
            <Youtube size={18} strokeWidth={1.5} className="text-black" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default LandingTopAnnouncementBar;
