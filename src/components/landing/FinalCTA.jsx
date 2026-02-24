"use client";
import { Shield, Sparkles, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-20" style={{ background: "linear-gradient(0deg, #0a3d52 0%, #0e6374 40%, #0e7490 70%, #0a5f75 100%)" }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
          Get a Free, Confidential Cancer Case Review
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 text-primary-foreground/80 text-sm mb-8">
          <span className="flex items-center gap-1.5"><Sparkles size={14} /> AI-assisted case pre-screening</span>
          <span className="flex items-center gap-1.5"><Stethoscope size={14} /> Doctor-reviewed treatment plans</span>
          <span className="flex items-center gap-1.5"><Shield size={14} /> No obligation</span>
        </div>
        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-7 shadow-xl"
        >
          Submit Medical Reports Now
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
