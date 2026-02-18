import Image from "next/image";

const highlights = [
  { icon: "/Leading-Hospitals.svg", title: "Leading Hospitals", desc: "Leading multi-specialty cancer hospitals in India" },
  { icon: "/Senior-Oncologists.svg", title: "Senior Oncologists", desc: "Senior oncologists with 15–30+ years of experience" },
  { icon: "/Comprehensive-Facilities.svg", title: "Comprehensive Facilities", desc: "Comprehensive cancer care facilities" },
];

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

const HospitalSection = () => (
  <section className="py-8 lg:py-12 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Hospitals & Oncologists</h2>
        <p className="text-muted-foreground mt-2">Our Hospital Network Includes</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {highlights.map((h, i) => (
          <div key={i} className="bg-card rounded-xl p-5 lg:p-6 shadow-md border border-border hover:shadow-lg transition-shadow text-center group">
            <div className="w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-110">
              <Image 
                src={h.icon} 
                alt={h.title} 
                width={64} 
                height={64} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-foreground mb-1">{h.title}</h3>
            <p className="text-sm text-muted-foreground">{h.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mb-10 max-w-lg mx-auto">
        Hospital and doctor options are recommended based on diagnosis, urgency, and budget.
      </p>

      {/* Logo Slider */}
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
    </div>
  </section>
);

export default HospitalSection;
