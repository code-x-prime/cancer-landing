import Image from "next/image";

const features = [
  { icon: "/Independent-Medical-Facilitation.svg", title: "Independent Medical Facilitation Company", desc: "We work for YOU, not the hospitals — ensuring unbiased doctor and hospital matching" },
  { icon: "/Pre-Screening-Faster-Turnaround.svg", title: "AI-Enabled Pre-Screening for Faster Turnaround", desc: "AI-assisted pre-screening organizes your case for quicker specialist review" },
  { icon: "/Patient-First-Hospital-Doctor-Matching.svg", title: "Patient-First Hospital and Doctor Matching", desc: "We match you with the best specialist for YOUR specific cancer type and stage" },
  { icon: "/Dedicated-Coordinators-African-Patients.svg", title: "Dedicated Coordinators for African Patients", desc: "Coordinators who understand African patients' unique needs and concerns" },
  { icon: "/Visa-Travel-Hospital.svg", title: "Visa + Travel + Hospital Support", desc: "Medical visa documentation, hospital appointments, treatment planning & logistics, travel and stay assistance" },
];

const WhyPanaceaSection = () => (
  <section className="py-8 lg:py-12 bg-secondary/50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why Panacea Medcare?</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <Image 
                src={f.icon} 
                alt={f.title} 
                width={48} 
                height={48} 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8 max-w-lg mx-auto">
        We combine technology with human expertise to simplify your cancer care journey.
      </p>
    </div>
  </section>
);

export default WhyPanaceaSection;
