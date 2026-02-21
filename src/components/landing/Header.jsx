"use client";
import Image from "next/image";

const Header = () => {
 

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-32 sm:w-48 h-auto relative">
            <Image src="/logo.png" alt="Panacea Medcare" className="w-full h-full object-contain" width={200} height={60} priority />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://wa.me/919958800961"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-bold hover:bg-[#20bd5c] transition-all shadow-md active:scale-95"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
            Contact Us: +91 995 880 0961
          </a>
          
          <a
            href="https://panaceamedcare.com/services/teleconsultation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F97316] text-white text-sm font-bold hover:bg-[#ea630c] transition-all shadow-md active:scale-95"
          >
            Free Consultation
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
