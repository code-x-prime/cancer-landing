import Image from "next/image";

const docs = [
  { icon: "/Recent-Medical-report.svg", name: "Recent Medical reports (PDF or images)", desc: "Lab reports, blood work, pathology results.", bg: "bg-teal-100", border: "border-teal-400" },
  { icon: "/Biopsy-histopathology-report.svg", name: "Biopsy / histopathology report", desc: "If available — critical for diagnosis accuracy.", bg: "bg-blue-100", border: "border-blue-400" },
  { icon: "/ct-mri-scans.svg", name: "CT / MRI / PET scans", desc: "Imaging helps oncologists assess cancer stage.", bg: "bg-purple-100", border: "border-purple-400" },
  { icon: "/Passport-copy.svg", name: "Passport copy", desc: "Required for medical visa documentation.", bg: "bg-orange-100", border: "border-orange-400" },
];

const DocumentsSection = () => (
  <section className="py-10 lg:py-12 bg-background relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -ml-36 -mb-36 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          📋 Documents
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Documents Required for Review</h2>
        <p className="text-muted-foreground text-lg">To ensure accurate review, please share:</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {docs.map((d, i) => (
          <div key={i} className={`flex items-start gap-5 p-7 bg-white rounded-2xl border-t-4 ${d.border} shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group`}>
            <div className={`w-16 h-16 flex-shrink-0 rounded-2xl ${d.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <Image src={d.icon} alt={d.name} width={40} height={40} className="object-contain" />
            </div>
            <div className="pt-1">
              <span className="font-extrabold text-foreground block text-base">{d.name}</span>
              <span className="text-sm text-muted-foreground mt-0.5 block">{d.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DocumentsSection;
