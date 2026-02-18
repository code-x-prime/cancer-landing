"use client";
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
      </div>
    </header>
  );
};

export default Header;
