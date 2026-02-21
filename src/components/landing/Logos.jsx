import Image from "next/image";

const logos = [
        { name: "Apollo Hospital Greams Road", src: "/logos/Apollo Hospital Greams Road.jpg" },
        { name: "Apollo Hospital Hyderabad", src: "/logos/Apollo Hospital Hyderabad.jpg" },
        { name: "Asian Institute of Medical Sciences", src: "/logos/asian hospital.jpg" },
        { name: "BLK Max Hospital", src: "/logos/BLK Max Hospital Pusa Road.jpg" },
        { name: "Bumrungrad International", src: "/logos/Bumrungrad Hospital.jpg" },
        { name: "Fortis Hospital", src: "/logos/Fortis Hospital Gurgaon.jpg" },
        { name: "Indraprastha Apollo", src: "/logos/indraprasth.jpg" },
        { name: "Manipal Hospital", src: "/logos/Manipal Hospital Dwarka.jpg" },
        { name: "Marengo Asia Hospital", src: "/logos/Marengo Asia Hospital, Gurgaon.jpg" },
        { name: "Max Hospital", src: "/logos/Max Hospital Saket.jpg" },
        { name: "Medanta Hospital", src: "/logos/Medanta Hospital, Gurgaon.jpg" },
        { name: "Memorial Hospital", src: "/logos/Memorial Hospital.jpg" },
        { name: "Neelkanth Hospital", src: "/logos/Neelkanth Maternity & IVF Hospital Gurgaon.jpg" },
        { name: "Nepal Mediciti", src: "/logos/Nepal Mediciti.jpg" },
        { name: "Sight Avenue Hospital", src: "/logos/Sight Avenue Hospital Gurgaon.jpg" },
        { name: "Stem Rx Hospital", src: "/logos/Stem Rx Hospital.jpg" },
        { name: "TX Hospital", src: "/logos/TX Hospital.jpg" },
    ];
const Logos = () => {
    return (
        <div className="overflow-hidden relative">
        <div className="flex animate-scroll gap-12 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center px-6 py-3 bg-white rounded-lg min-w-[180px] h-24 shadow-sm border border-border">
              <Image 
                src={logo.src} 
                alt={logo.name} 
                width={140} 
                height={60} 
                className="w-full h-full object-contain mix-blend-multiply hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    );
};

export default Logos;