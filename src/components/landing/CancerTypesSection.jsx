"use client";

import Image from "next/image";

const types = [
  { icon: "/Breast-Cancer.svg", name: "Breast Cancer" },
  { icon: "/Prostate-Cancer.svg", name: "Prostate Cancer" },
  { icon: "/Colorectal-Cancer.svg", name: "Colorectal Cancer" },
  { icon: "/Cervical-Cancer.svg", name: "Cervical Cancer" },
  { icon: "/Lung-Cancer.svg", name: "Lung Cancer" },
  { icon: "/Blood-Cancers.svg", name: "Blood Cancers (Leukaemia, Lymphoma)" },
  { icon: "/Ovarian-Gynaecological-Cancers.svg", name: "Ovarian & Other Gynaecological Cancers" },
];

const CancerTypesSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 lg:py-12 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Types of Cancer We Support</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {types.map((t, i) => (
            <button
              key={i}
              onClick={scrollToForm}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
                <Image 
                  src={t.icon} 
                  alt={t.name} 
                  width={48} 
                  height={48} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{t.name}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          If your cancer type is not listed, our team can still guide you. AI-assisted pre-screening helps route each case to the most relevant oncology team.
        </p>
      </div>
    </section>
  );
};

export default CancerTypesSection;
