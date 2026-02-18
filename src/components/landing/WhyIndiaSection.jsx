import Image from "next/image";

const reasons = [
  { icon: "/Lower-Cost.svg", title: "30–60% Lower Cost", desc: "Advanced cancer care at 30–60% lower cost" },
  { icon: "/Experienced-Oncologists.svg", title: "Experienced Oncologists", desc: "Access to experienced oncologists across major specialties" },
  { icon: "/Modern-Infrastructure.svg", title: "Modern Infrastructure", desc: "Modern diagnostic and treatment infrastructure" },
  { icon: "/English-Speaking.svg", title: "English-Speaking", desc: "English-speaking doctors and international patient departments" },
];

const WhyIndiaSection = () => (
  <section className="py-8 lg:py-12 bg-secondary/50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Why India for Cancer Treatment?
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 xl:gap-6">
        {reasons.map((r, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-card shadow-sm border border-border group hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mb-4 transition-transform group-hover:scale-110">
              <Image 
                src={r.icon} 
                alt={r.title} 
                width={64} 
                height={64} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyIndiaSection;
