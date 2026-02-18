import Image from "next/image";

const docs = [
  { icon: "/Recent-Medical-report.svg", name: "Recent Medical reports (PDF or images)" },
  { icon: "/Biopsy-histopathology-report.svg", name: "Biopsy / histopathology report (if available)" },
  { icon: "/ct-mri-scans.svg", name: "CT / MRI / PET scans (if available)" },
  { icon: "/Passport-copy.svg", name: "Passport copy" },
];

const DocumentsSection = () => (
  <section className="py-8 lg:py-12 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Documents Required for Review</h2>
        <p className="text-muted-foreground mt-2">To ensure accurate review, please share:</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {docs.map((d, i) => (
          <div key={i} className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110">
              <Image 
                src={d.icon} 
                alt={d.name} 
                width={48} 
                height={48} 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-medium text-foreground">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DocumentsSection;
