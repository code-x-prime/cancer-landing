import Image from "next/image";

const costs = [
  { icon: "/Chemotherapy.svg", title: "Chemotherapy", range: "USD 2,500 – 6,000", color: "from-primary to-primary/80" },
  { icon: "/Cancer-Surgery.svg", title: "Cancer Surgery", range: "USD 4,000 – 12,000", color: "from-primary/90 to-primary/70" },
  { icon: "/Radiation-Therapy.svg", title: "Radiation Therapy", range: "USD 3,000 – 7,000", color: "from-primary/80 to-primary/60" },
  { icon: "/Combined-Treatment-Packages.svg", title: "Combined Treatment Packages", range: "USD 5,000 – 15,000", color: "from-accent to-accent/80" },
];

const CostSection = () => (
  <section className="py-8 lg:py-12 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Cancer Treatment Cost in India
        </h2>
        <p className="text-muted-foreground mt-2">Estimated Treatment Costs</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 xl:gap-6">
        {costs.map((c, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg border border-border group hover:shadow-xl transition-shadow">
            <div className={`bg-gradient-to-br ${c.color} p-5 text-primary-foreground text-center`}>
              <div className="w-16 h-16 mx-auto mb-2 relative">
                 <Image 
                    src={c.icon} 
                    alt={c.title} 
                    fill
                    className="object-contain brightness-0 invert"
                  />
              </div>
              <h3 className="font-bold text-base">{c.title}</h3>
            </div>
            <div className="p-5 bg-card text-center">
              <p className="text-xl font-bold text-foreground">{c.range}</p>
              <p className="text-xs text-muted-foreground mt-1">Estimated cost range</p>
            </div>
          </div>
        ))}
      </div>


      <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
        A personalised cost estimate is shared after doctor review of medical reports.
      </p>
    </div>
  </section>
);

export default CostSection;
