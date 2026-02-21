import Image from "next/image";

const highlights = [
  { icon: "/Leading-Hospitals.svg", title: "Leading Hospitals", desc: "Leading multi-specialty cancer hospitals in India" },
  { icon: "/Senior-Oncologists.svg", title: "Senior Oncologists", desc: "Senior oncologists with 15–30+ years of experience" },
  { icon: "/Comprehensive-Facilities.svg", title: "Comprehensive Facilities", desc: "Comprehensive cancer care facilities" },
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
     
    </div>
  </section>
);

export default HospitalSection;
