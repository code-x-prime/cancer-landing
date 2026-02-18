import Image from "next/image";

const steps = [
  { icon: "/medical-reports.svg", title: "Submit your medical reports securely", desc: "(Diagnosis, biopsy, scans if available)" },
  { icon: "/AI-assisted-pre-screening.svg", title: "AI-assisted case pre-screening", desc: "Your case is organised and matched to the most relevant cancer specialists" },
  { icon: "/senior-oncologists-review-case.svg", title: "Senior oncologists review your case", desc: "Doctors recommend treatment options and estimated costs" },
  { icon: "/End-to-end-support.svg", title: "End-to-end support by Panacea Medcare", desc: "Medical visa, hospital coordination, travel & treatment scheduling" },
];

const ProcessSection = () => (
  <section className="py-8 lg:py-12 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          How Cancer Treatment in India Works
        </h2>
        <p className="text-muted-foreground mt-2">Our 4-Step Patient-Centric Process</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 xl:gap-6">
        {steps.map((step, i) => (
          <div key={i} className="relative bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow text-center group">
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {i + 1}
            </div>
            <div className="w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-110">
              <Image 
                src={step.icon} 
                alt={step.title} 
                width={64} 
                height={64} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-bold text-foreground mb-2 text-sm">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 max-w-md mx-auto">
        Technology improves speed. Doctors make all medical decisions.
      </p>
    </div>
  </section>
);

export default ProcessSection;
