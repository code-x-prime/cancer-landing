"use client";

import Image from "next/image";

const types = [
  { icon: "/Breast-Cancer.svg", name: "Breast Cancer", bg: "bg-pink-100", border: "border-pink-300 hover:border-pink-500" },
  { icon: "/Prostate-Cancer.svg", name: "Prostate Cancer", bg: "bg-blue-100", border: "border-blue-300 hover:border-blue-500" },
  { icon: "/Colorectal-Cancer.svg", name: "Colorectal Cancer", bg: "bg-orange-100", border: "border-orange-300 hover:border-orange-500" },
  { icon: "/Cervical-Cancer.svg", name: "Cervical Cancer", bg: "bg-purple-100", border: "border-purple-300 hover:border-purple-500" },
  { icon: "/Lung-Cancer.svg", name: "Lung Cancer", bg: "bg-teal-100", border: "border-teal-300 hover:border-teal-500" },
  { icon: "/Blood-Cancers.svg", name: "Blood Cancers (Leukaemia, Lymphoma)", bg: "bg-red-100", border: "border-red-300 hover:border-red-500" },
  { icon: "/Ovarian-Gynaecological-Cancers.svg", name: "Ovarian & Other Gynaecological Cancers", bg: "bg-indigo-100", border: "border-indigo-300 hover:border-indigo-500" },
];

const CancerTypesSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 lg:py-12 bg-gradient-to-b from-secondary/20 to-secondary/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            🎗️ Cancer Types
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Types of Cancer We Support</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5">
          {types.map((t, i) => (
            <button
              key={i}
              onClick={scrollToForm}
              className={`flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border-2 ${t.border} shadow-md hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <Image src={t.icon} alt={t.name} width={36} height={36} className="object-contain" />
              </div>
              <span className="text-sm font-bold text-foreground text-center leading-tight">{t.name}</span>
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-lg mx-auto">
          If your cancer type is not listed, our team can still guide you. AI-assisted pre-screening helps route each case to the most relevant oncology team.
        </p>
      </div>
    </section>
  );
};

export default CancerTypesSection;
