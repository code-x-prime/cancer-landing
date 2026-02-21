import Image from "next/image";

const reasons = [
  { icon: "/Lower-Cost.svg", title: "30–60% Lower Cost", desc: "Advanced cancer care at a fraction of Western costs, without compromising quality.", bg: "bg-green-200", cardBg: "bg-gradient-to-br from-green-50 to-emerald-100 border border-green-300" },
  { icon: "/Experienced-Oncologists.svg", title: "Experienced Oncologists", desc: "Access to top oncologists with international training across major specialties.", bg: "bg-teal-200", cardBg: "bg-gradient-to-br from-teal-50 to-cyan-100 border border-teal-300" },
  { icon: "/Modern-Infrastructure.svg", title: "Modern Infrastructure", desc: "State-of-the-art NABH/JCI-accredited hospitals with advanced diagnostic tech.", bg: "bg-blue-200", cardBg: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-300" },
  { icon: "/English-Speaking.svg", title: "English-Speaking", desc: "English-speaking doctors & dedicated international patient services.", bg: "bg-purple-200", cardBg: "bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-300" },
];

const WhyIndiaSection = () => (
  <section className="py-12 lg:py-20 bg-gradient-to-b from-secondary/60 to-secondary/20 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -mr-40 -mb-40 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          🇮🇳 India Advantage
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          Why India for Cancer Treatment?
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <div key={i} className={`flex flex-col items-center text-center p-8 rounded-2xl shadow-lg ${r.cardBg} hover:shadow-2xl hover:-translate-y-2 transition-all group`}>
            <div className={`w-20 h-20 mb-5 rounded-2xl ${r.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Image src={r.icon} alt={r.title} width={52} height={52} className="object-contain" />
            </div>
            <h3 className="font-extrabold text-foreground mb-2 text-xl">{r.title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyIndiaSection;
