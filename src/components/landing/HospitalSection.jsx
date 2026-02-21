import Image from "next/image";

const highlights = [
  { icon: "/Leading-Hospitals.svg", title: "Leading Hospitals", desc: "Leading multi-specialty cancer hospitals in India — NABH & JCI accredited for international patients.", bg: "bg-teal-100", border: "border-teal-400" },
  { icon: "/Senior-Oncologists.svg", title: "Senior Oncologists", desc: "Senior oncologists with 15–30+ years of experience in complex cancer surgeries and therapies.", bg: "bg-blue-100", border: "border-blue-400" },
  { icon: "/Comprehensive-Facilities.svg", title: "Comprehensive Facilities", desc: "Cutting-edge radiation, surgical oncology, immunotherapy, and bone marrow transplant units.", bg: "bg-purple-100", border: "border-purple-400" },
];

const HospitalSection = () => (
  <section className="py-10 lg:py-12 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -ml-40 -mt-40 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          🏥 Partner Network
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Hospitals & Oncologists</h2>
        <p className="text-muted-foreground text-lg">Our Hospital Network Includes</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {highlights.map((h, i) => (
          <div key={i} className={`bg-white rounded-2xl p-8 shadow-lg border-l-4 ${h.border} hover:shadow-2xl hover:-translate-y-2 transition-all text-center group`}>
            <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl ${h.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Image src={h.icon} alt={h.title} width={52} height={52} className="object-contain" />
            </div>
            <h3 className="font-extrabold text-foreground mb-2 text-lg">{h.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mb-10 max-w-lg mx-auto">
        Hospital and doctor options are recommended based on diagnosis, urgency, and budget.
      </p>
    </div>
  </section>
);

export default HospitalSection;
