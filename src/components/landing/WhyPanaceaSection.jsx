import Image from "next/image";

const features = [
  { icon: "/Independent-Medical-Facilitation.svg", title: "Independent Medical Facilitation Company", desc: "We work for YOU, not the hospitals — ensuring unbiased doctor and hospital matching.", bg: "bg-green-200", cardBg: "bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-green-400" },
  { icon: "/Pre-Screening-Faster-Turnaround.svg", title: "AI-Enabled Pre-Screening for Faster Turnaround", desc: "AI-assisted pre-screening organizes your case for quicker specialist review.", bg: "bg-teal-200", cardBg: "bg-gradient-to-r from-teal-50 to-cyan-100 border-l-4 border-teal-400" },
  { icon: "/Patient-First-Hospital-Doctor-Matching.svg", title: "Patient-First Hospital and Doctor Matching", desc: "We match you with the best specialist for YOUR specific cancer type and stage.", bg: "bg-blue-200", cardBg: "bg-gradient-to-r from-blue-50 to-indigo-100 border-l-4 border-blue-400" },
  { icon: "/Dedicated-Coordinators-African-Patients.svg", title: "Dedicated Coordinators for African Patients", desc: "Coordinators who understand African patients' unique needs and concerns.", bg: "bg-purple-200", cardBg: "bg-gradient-to-r from-purple-50 to-violet-100 border-l-4 border-purple-400" },
  { icon: "/Visa-Travel-Hospital.svg", title: "Visa + Travel + Hospital Support", desc: "Medical visa documentation, hospital appointments, treatment planning & logistics, travel and stay assistance.", bg: "bg-orange-200", cardBg: "bg-gradient-to-r from-orange-50 to-amber-100 border-l-4 border-orange-400" },
];

const WhyPanaceaSection = () => (
  <section className="py-10 lg:py-12 bg-gradient-to-b from-secondary/60 to-secondary/20 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -ml-40 -mt-40 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          ✅ Our Edge
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Why Panacea Medcare?</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        {features.map((f, i) => (
          <div key={i} className={`flex items-start gap-6 ${f.cardBg} rounded-2xl px-6 py-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group`}>
            <div className={`w-16 h-16 flex-shrink-0 rounded-2xl ${f.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Image src={f.icon} alt={f.title} width={40} height={40} className="object-contain" />
            </div>
            <div className="pt-1">
              <h3 className="font-extrabold text-foreground text-xl group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-base text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
        We combine technology with human expertise to simplify your cancer care journey.
      </p>
    </div>
  </section>
);

export default WhyPanaceaSection;
