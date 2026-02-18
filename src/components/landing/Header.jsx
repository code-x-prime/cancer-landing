"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
 

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4  flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-32 sm:w-48 h-auto relative">
            <Image src="/logo.png" alt="Panacea Medcare" className="w-full h-full  object-contain"  width={100} height={100}/>
          </div>
         
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/919958800961"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-whatsapp text-whatsapp-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5" width={100} height={100} />
            WhatsApp
          </a>
          <a
            href="https://panaceamedcare.com/services/teleconsultation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-sm px-4 py-2">
              <Phone size={16} className="mr-1" />
              Free Consultation
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
