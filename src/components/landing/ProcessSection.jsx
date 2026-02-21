"use client";

import Image from "next/image";

const steps = [
  { icon: "/medical-reports.svg", title: "Submit your medical reports securely", desc: "(Diagnosis, biopsy, scans if available)", color: "from-teal-500 to-cyan-600", bg: "bg-teal-100", border: "border-teal-400", cardBg: "bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-300" },
  { icon: "/AI-assisted-pre-screening.svg", title: "AI-assisted case pre-screening", desc: "Your case is organised and matched to the most relevant cancer specialists", color: "from-blue-500 to-indigo-600", bg: "bg-blue-100", border: "border-blue-400", cardBg: "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300" },
  { icon: "/senior-oncologists-review-case.svg", title: "Senior oncologists review your case", desc: "Doctors recommend treatment options and estimated costs", color: "from-purple-500 to-violet-600", bg: "bg-purple-100", border: "border-purple-400", cardBg: "bg-gradient-to-br from-purple-50 to-violet-100 border-purple-300" },
  { icon: "/End-to-end-support.svg", title: "End-to-end support by Panacea Medcare", desc: "Medical visa, hospital coordination, travel & treatment scheduling", color: "from-orange-500 to-amber-500", bg: "bg-orange-100", border: "border-orange-400", cardBg: "bg-gradient-to-br from-orange-50 to-amber-100 border-orange-300" },
];

const ProcessSection = () => (
  <section className="py-12 lg:py-20 bg-background relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          🔬 Step-by-Step Process
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          How Cancer Treatment in India Works
        </h2>
        <p className="text-muted-foreground text-lg">Our 4-Step Patient-Centric Process</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className={`relative ${step.cardBg} rounded-2xl p-8 shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all text-center group`}>
            <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-base font-extrabold shadow-lg`}>
              {i + 1}
            </div>
            <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl ${step.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Image src={step.icon} alt={step.title} width={52} height={52} className="object-contain" />
            </div>
            <h3 className="font-extrabold text-foreground mb-2 text-xl leading-snug">{step.title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-10 max-w-md mx-auto">
        Technology improves speed. Doctors make all medical decisions.
      </p>
    </div>
  </section>
);

export default ProcessSection;
